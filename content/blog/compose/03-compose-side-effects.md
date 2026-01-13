---
title: '::compose:: Side-effect(부수효과) 개념'
date: "2025-11-12T22:55:00.284Z"
description: "Side-effect(부수효과) 개념을 설명하고 자주 사용하는 Side-effect 를 정리합니다."
categories: ["안드로이드", "컴포즈"]
tags: ["android", "jetpack compose", "Side-effect", "부수효과"]
---

# Side-effect 소개

Side-effect 는 Composable 함수가 자신의 주요 임무(UI를 계산하는 일) 외에 외부 세계에 영향을 미치는 모든 행위 또는 변경 사항을 의미합니다.  
예를 들어
- 네트워크 요청으로 서버 데이터 업데이트
- SharedPreferences 값 변경
- File 조작, Log 기록, ViewModel의 내부데이터 변경 등등

Compose 에서는 Compasable 함수 내에서 이러한 Side-Effect 가 없고 순수한 함수의 형태로 사용하는 것이 좋습니다.  그러나 실제 개발을 하다보면 Side-Effect 가 필요한 상황이 많고 이럴 때에는 Jetpack Compose 에서 제공하는 Side-Effect API 를 사용해서 처리합니다.
Side-Effect API 는 컴포저블의 생명주기를 인식하여 관리된 환경을 제공합니다.

>       참고  
>       "컴포저블 함수는 최대한 순수함수의 형태로 유지하는게 좋고  
>       Side-Effect API 도 남용하지 않는 것이 좋습니다."  
>       이 말은 나중에 설명하게될 컴포즈의 중요한 개념인  
>       State Hoisting(상태 끌어올리기) 와도 이어지는 내용입니다.

# Side-effect API 와 사용사례

많이 사용하는 Side-effect API 를 소개하고 이해를 위한 예제를 같이 보겠습니다.

## LaunchedEffect

LaunchedEffect는 컴포저블이 생성될 때 매개변수로 전달된 코루틴 블록이 호출되며, key 가 바뀌지 않는 이상 컴포저블 생명주기 동안 한번만 실행됩니다.(즉, key 가 바뀌지 않는 이상 리컴포지션에 반응하지 않음)  
***key 가 변경*** 되면 기존 코루틴은 `취소`되고 `다시 실행`됩니다.  
***컴포지션이 종료*** 되면 코루틴은 `취소` 됩니다.  
주로 화면이 그려졌을 때 초기화 작업(예: 네트워크 통신으로 데이터 불러오기) 에 사용됩니다.  

```kotlin
public fun LaunchedEffect(key1: Any?, block: suspend CoroutineScope.() -> Unit)
```

##### Launched Effect 예제

```kotlin
@Composable
fun MyComposable(count: Int, onIncrement: () -> Unit) {
    val name = remember { mutableStateOf("Loading...") }
    LaunchedEffect(Unit) {
        Log.d("EffectTest", "LaunchedEffect 시작: 사용자 이름 가져오는 중...")
        name.value = fetchUserName()
    }

    Column {
        Text(
            text = "Hello ${name.value}!, count: $count",
            modifier = Modifier
        )
        Button(onClick = onIncrement) {
            Text(text = "Click Me") // 카운트 증가 (리컴포지션 유발)
        }
    }
}

suspend fun fetchUserName(): String {
    delay(1000) // 1초 지연 시뮬레이션
    return listOf("Jame", "Json", "Dean").random()
}
```

예제를 실행해보면 MyComposable 이 처음 호출될 때에만 LaunchedEffect 가 호출되고 이후 "Click Me" 버튼을 클릭해서 리컴포지션을 유발해도 LaunchedEffect 가 호출되지 않는 것을 확인할 수 있습니다.  


##### Launched Effect 취소 예제

이제 Luanched Effect 의 코루틴이 key 값에 의해 취소되는 과정을 보겠습니다.  
테스트를 위해 key 에 Unit 이 아닌 count 값을 줘서 count 가 바뀔때 마다 Launced Effect 의 코루틴이 취소되고 다시 실행되도록 하고 try-catch 에서 CancellationException 로 코루틴 취소를 로그로 확인하겠습니다.   
편의를 위해 fetchUserName 의 딜레이를 5초로 늘려주겠습니다.  

```kotlin
@Composable
fun MyComposable(count: Int, onIncrement: () -> Unit) {
    val name = remember { mutableStateOf("Loading...") }
    LaunchedEffect(count) {
        Log.d("EffectTest", "Key $count: LaunchedEffect 시작: 사용자 이름 가져오는 중...")
        try {
            name.value = fetchUserName()
        } catch (e: CancellationException) {
            Log.w("EffectTest", "Key $count: 이전 코루틴이 취소되었습니다!")
        } finally {
            Log.d("EffectTest", "--- LaunchedEffect 종료 (Key: $count) ---")
        }
    }

    Column {
        Text(
            text = "Hello ${name.value}!, count: $count",
            modifier = Modifier
        )
        Button(onClick = onIncrement) {
            Text(text = "Click Me") // 카운트 증가 (리컴포지션 유발)
        }
    }
}

suspend fun fetchUserName(): String {
    delay(5000) // 5초 지연 시뮬레이션
    return listOf("Jame", "Json", "Dean").random()
}
```

```
D  Key 0: LaunchedEffect 시작: 사용자 이름 가져오는 중...
W  Key 0: 이전 코루틴이 취소되었습니다!
D  --- LaunchedEffect 종료 (Key: 0) ---
D  Key 1: LaunchedEffect 시작: 사용자 이름 가져오는 중...
D  --- LaunchedEffect 종료 (Key: 1) ---
```

Count 0 일 때 버튼을 한번더 누르게되면 key 값이 바뀌게 되어 이전 코루틴은 취소되고 Luanched Effact 가 다시 호출되는 것을 확인할 수 있습니다.


## rememberCoroutineScope

`rememberCoroutineScope`는 컴포즈 환경에서 CoroutineScope 객체를 생성하고 기억(remember)하는 함수입니다.  
`Button` 의 `onClick` 과 같은 일반 콜백에서 `suspend` 함수를 호출하려면 코루틴 스코프를 사용해야 되는데,  
이때 코루틴 스코프를 새로 만들지 않고 rememberCoroutineScope 사용해서 한번만 생성하여 안전하게 처리할 수 있습니다.  

핵심 역할
1. **Scope 생성**: 컴포저블 내에서 코루틴을 실행할 수 있는 범위를 제공합니다.
2. **생명 주기 연결**: 이 Scope는 해당 컴포저블의 컴포지션 생명 주기에 연결됩니다. 즉, 컴포저블이 화면에서 사라지면(Dispose), 이 Scope와 그 안에서 실행 중이던 모든 코루틴이 자동으로 취소됩니다.
3. **명령형 실행**: 주로 onClick이나 onValueChange와 같은 사용자 이벤트 콜백 내에서 launch를 호출하여 코루틴을 시작할 때 사용됩니다.


##### rememberCoroutineScope 예제

스낵바를 문제를 통해 확인해 보겠습니다.

`Scaffold`의 `snackbarHostState`를 사용하여 스낵바를 표시하려면 `suspend` 함수인 `showSnackbar()`를 호출해야 합니다. 하지만 `Button`의 `onClick` 블록은 일반 함수이므로 `suspend` 함수를 직접 호출할 수 없습니다.

🚫 ***Case 1***: `onClick` 에서 suspend 함수 호출 (컴파일 오류)
```kotlin
// [문제점] onClick은 suspend 함수를 직접 호출할 수 없음
@Composable
fun BadSnackbarExample(snackbarHostState: SnackbarHostState) {
    Button(
        onClick = {
            // 🚨 컴파일 오류 발생: suspend 함수는 코루틴 내에서만 호출 가능
            // snackbarHostState.showSnackbar("메시지")
        }
    ) {
        Text("스낵바 표시")
    }
}
```

이 문제를 해결하기 위해 깔끔하지 않은(그리고 틀린) 방법은 다음과 같습니다.

🚫 ***Case 2***: 깔끔하지 않은 해결책 (GlobalScope 사용)
```kotlin
//
@Composable
fun BadSnackbarExample(snackbarHostState: SnackbarHostState) {
    Button(
        onClick = {
            // 🚨 문제점 1: GlobalScope 사용은 지양됨 (앱 전체 생명주기에 연결되어 취소 관리가 어려움)
            // 🚨 문제점 2: 해당 컴포저블이 사라져도 작업이 계속 실행될 수 있음
            GlobalScope.launch { 
                snackbarHostState.showSnackbar("메시지")
            }
        }
    ) {
        Text("스낵바 표시")
    }
}
```

✅ ***Case 3***: rememberCoroutineScope 사용 (깔끔한 코드)

`rememberCoroutineScope`를 사용하여 컴포저블의 생명 주기에 맞는 Scope를 만들고, 이 Scope를 사용하여 onClick 이벤트 내에서 안전하게 코루틴을 시작합니다.

```kotlin
// ✅ Case 2: rememberCoroutineScope 사용 (권장되는 방법)
@Composable
fun GoodSnackbarExample(snackbarHostState: SnackbarHostState) {
    // ✨ 장점 1: 컴포저블의 생명주기에 연결된 Scope를 안전하게 기억 (remember)
    val scope = rememberCoroutineScope() 

    Button(
        onClick = {
            // ✨ 장점 2: 해당 Scope 내에서 코루틴을 시작하여 suspend 함수 호출
            scope.launch { 
                // ✨ 장점 3: 컴포저블이 사라지면 이 코루틴도 자동 취소됨
                snackbarHostState.showSnackbar(
                    message = "메시지가 표시되었습니다!",
                    actionLabel = "닫기"
                )
            }
        }
    ) {
        Text("스낵바 표시")
    }
}
```

## rememberUpdatedState

`rememberUpdatedState` 는 오래 지속되는 Side-Effect API 를 사용할 때 항상 최신의 상태나, 콜백을 참조할 수 있도록 해주는 함수입니다.  
`LaunchedEffec` 나 `DisposableEffect` 를 사용해 오랜 시간 대기 후 전달받은 State 를 읽게 되면 이 상태 값은 콜백 블록이 실행되었을 때 캡처된 상태를 가져오게 됩니다.  
만약 이게 아닌 최신의 상태값을 가져와야할 경우 사용하는 Effect가 rememberUpdatedState 입니다.

`rememberUpdatedState`는 예를 들어서 설명하는게 이해가 쉬운데,  
컴포져블이 생성된 후 5초 뒤 최신 상태값을 로그로 출력해야 되는 시나리로를 가정해 봅시다.  

🚫 **Case 1**: `rememberUpdatedState` 미사용 (오래된 콜백 참조 문제)
```kotlin
// ⚠️ Stale State 문제가 발생하는 Composable 함수
@Composable
fun BadStateContent(count: Int, onClick: () -> Unit) {
    // LaunchedEffect의 Key가 Unit이므로, 컴포저블이 화면에 있는 동안 단 한 번만 실행됨 (재시작되지 않음)
    LaunchedEffect(Unit) {
        // 1. LaunchedEffect가 처음 실행될 때의 count 값만 캡처하여 기억함
        Log.d("Remember", "5초 타이머 시작! 초기 count: $count")

        delay(5000) // 5초 동안 비동기 대기

        // 2. 5초 후 호출 시점: 
        // 외부에서 Button 클릭으로 인해 count가 1, 2, 3 등으로 증가해도, 
        // 이 블록 안의 count는 LaunchedEffect가 시작될 때 캡처한 '오래된 초기값'($count)만 유지하고 출력합니다.
        Log.d("Remember", "5초 후 LaunchedEffect 내부의 count: $count") // ❌ Stale State(오래된 상태) 출력!
    }

    Column {
        // 이 Text는 리컴포지션될 때마다 최신 count 값을 즉시 반영하여 출력함
        Text("현재 화면에 표시되는 최신 count: $count")
        Button(onClick = onClick) {
            Text("Click Me (count 증가)")
        }
    }
}
```

✅ 올바른 처리: rememberUpdatedState 사용
```kotlin
// ✨ LaunchedEffect 내부에서 최신 상태를 참조하는 Composable 함수
@Composable
fun CorrectStateContent(count: Int, onClick: () -> Unit) {
    
    // 💡 해결책: 'count' 값을 rememberUpdatedState로 래핑하여 최신 값을 기억합니다.
    // 'latestCount'는 컴포저블이 리컴포즈될 때마다 자동으로 최신 count 값으로 업데이트됩니다.
    val latestCount by rememberUpdatedState(count)

    // Key = Unit: 타이머는 절대 재시작되지 않고 5초 동안 실행을 유지합니다.
    LaunchedEffect(Unit) { 
        Log.d("Remember", "5초 타이머 시작! (재시작 없음)")
        
        delay(5000) // 5초 동안 비동기 대기
        
        // 1. 5초 후 호출 시점: 
        // LaunchedEffect는 'latestCount'를 참조합니다. 
        // latestCount는 불변 객체이지만, 내부적으로는 가장 최신 업데이트된 count 값을 가지고 있습니다.
        Log.d("Remember", "5초 후 LaunchedEffect 내부의 최신 count: $latestCount") // ✅ 최신 상태(Latest State) 출력!
    }
    
    Column {
        // 화면 표시는 여전히 최신 count 값을 즉시 반영
        Text("현재 화면에 표시되는 최신 count: $count") 
        Button(onClick = onClick) {
            Text("Click Me (count 증가)")
        }
    }
}
```

예시에서는 매개변수로 **상태 값(data)** 을 전달받는 경우를 다뤘지만, 이는 콜백 함수를 매개변수로 전달받을 때도 동일하게 적용됩니다. 
**콜백**을 5초 후에 실행해야 한다고 하면  
`rememberUpdatedState` 를 사용하지 않으면 5초 사이에 리컴포지션이 호출되어 콜백이 변경 되더라도 **최신 콜백이 아닌 이전에 캡쳐된 콜백이 호출되는 문제** 를 겪을 수 있습니다.  


## DisposableEffect

`DisposableEffect` 은 Composable이 Composition에 진입하거나 (초기화) 키가 변경될 때 호출됩니다.  
DisposableEffect(key1, key2, ...) 형태로 사용하며, 이는 내부적으로 **DisposableEffectScope**를 확장하는 람다 함수를 인수로 받습니다. (DisposableEffectScope는 **코루틴 스코프** 가 아님)  
`DisposableEffectScope` 는 onDispose { ... } 블록 구현을 강제합니다. 이 블록은 Composable이 Composition에서 제거될 때 (화면 전환, 컴포넌트 폐기 등) 또는 key 값이 변경되어 Effect가 재실행될 때 호출되어 리소스를 정리합니다.

공식 문서 예제가 가장 이해가 좋은 예인것 같아서 주석만 수정해서 확인해 보면,

```kotlin
@Composable
fun HomeScreen(
    lifecycleOwner: LifecycleOwner = LocalLifecycleOwner.current,
    onStart: ()->Unit, // '시작됨(started)' 분석 이벤트를 전송
    onStop: ()->Unit //'종료됨(stopped)' 분석 이벤트를 전송
) {
    // 새로운 람다가 제공될 때 현재 람다를 안전하게 업데이트합니다.
    val currentOnStart = rememberUpdatedState(onStart)
    val currentOnStop = rememberUpdatedState(onStop)

    // `lifecycleOwner`가 변경되면, 이 effect를 폐기하고 재설정합니다
    DisposableEffect(lifecycleOwner) {
        // 분석 이벤트 전송을 위해 저장된 콜백을 트리거하는 옵저버를 생성합니다.
        val observer = LifecycleEventObserver { _, event ->
            if (event == Lifecycle.Event.ON_START) {
                currentOnStart.value()
            } else if (event == Lifecycle.Event.ON_STOP) {
                currentOnStop.value()
            }
        }

        lifecycleOwner.lifecycle.addObserver(observer = observer)

        // 이 effect를 호출한 컴포저블이 사라지게 되면 옵저버를 제거합니다.
        onDispose {
            lifecycleOwner.lifecycle.removeObserver(observer)
        }
    }
}
```

DisposableEffect(lifecycleOwner)를 사용하면, 해당 HomeScreen Composable이 화면에 나타나고 사라지는 시점을 Activity의 생명주기에 정확히 맞추어 정리(dispose) 및 초기화할 수 있습니다.  
예를 들어, HomeScreen이 NavHost를 통해 네비게이션으로 진입하고 나갈 때, 이 이벤트 추적이 정확히 시작되고 중지되어야 합니다.

만약, 모든 화면에서 이벤트 처리를 해야하는데 `DisposableEffect` 가 없다면?  
화면(Composable)별 이벤트를 처리하기 위해 결국 **Activity의 onStart()** 에 의존하게 되며, 이는 코드를 복잡하게 만듭니다.


## SideEffect

`SideEffect`는 컴포저블이 컴포지션/리컴포지션이 발생할 때 마다 호출됩니다.  
Compose의 상태를 외부와 공유할 때 사용됩니다. 만약, 특정 화면에서 사용자가 계정 전환을 해서 userType 이라는 FirebaseAnalytics 객체의 속성값이 변경되어야 한다고 가정해보겠습니다. FirebaseAnalytics 객체는 생성된 상태에서 리컴포즈 시 userType 속성만 변경해야합니다.  
이럴 때 사용하는 것이 `SideEffect` 입니다.

코드 예시를 보면

```kotlin
@Composable
fun rememberFirebaseAnalytics(user: User): FirebaseAnalytics {
    // remember 로 FirebaseAnalytics 는 한번만 생성
    val analytics: FirebaseAnalytics = remember {
        FirebaseAnalytics()
    }

    // user 변경에 의해 컴포지션이 발생할 때마다,
    // 현재 User의 userType으로 FirebaseAnalytics를 업데이트 합니다. 
    // 이로써 향후 모든 분석 이벤트에 해당 메타데이터가 첨부되도록 보장합니다.
    SideEffect {
        analytics.setUserProperty("userType", user.userType)
    }
    return analytics
}
```


## produceState

`produceState` 는 비동기 소스에서 발생하는 데이터를 Compose 의 `State`로 변환하고 관리하는데 사용됩니다.
특징으로는
- 초기 값 제공: Composition에 진입할 때 즉시 사용할 수 있는 초기값 
- 코루신 생행: `LaunchedEffect` 처럼 코루틴 스코프를 제공하여 비동기 작업을 처리할 수 있습니다.
- 값 업데이트: 코루틴 내부에서 `value` 속성을 통해 값을 업데이트하면, 이 상태를 사용하는 컴포저블이 리컴포즈 됩니다.
- 자동정리: 컴포저블이 Composition 에서 제거되거나 키가 변경되면, 내부 코루틴이 자동으로 취소됩니다.(`LuanchedEffect` 와 유사)

Flow, LiveData, Rxjava, Listener 등을 사용한 외부 구독 기반 생태를 컴포지션으로 변환할 때 주로 사용합니다.

공식문서 예제는 Image 로드 초기값 `Result.Loading`을 주고 로드 성공/실패 시 상태를 업데이트해 줍니다.
```kotlin
@Composable
fun loadNetworkImage(
    url: String,
    imageRepository: ImageRepository = ImageRepository()
): State<Result<Image>> {
    // Result.Loading을 초기값으로 갖는 State<T>를 생성합니다.
    // 만약 `url` 또는 `imageRepository`가 변경되면, 실행 중이던 생산자(producer)는 취소되고
    // 새로운 입력값(url, imageRepository)으로 다시 시작됩니다.
    return produceState<Result<Image>>(initialValue = Result.Loading, url, imageRepository) {
        // produceState 내부: LaunchedEffect와 동일하게 코루틴 환경이 제공됩니다.
        // 코루틴 내에서 정지 함수(suspend calls)를 호출할 수 있습니다.
        val image = imageRepository.load(url)

        // State 값 업데이트: 에러(Error) 또는 성공(Success) 결과로 State를 갱신합니다.
        // 💡 이 'value =' 업데이트는 이 State를 읽고 있는 모든 Composable에서
        //    자동으로 Recomposition을 트리거합니다.
        value = if (image == null) {
            Result.Error
        } else {
            Result.Success(image)
        }
    }
}
```

추가로 위치값을 계속해서 가져와야될 때 사용할 수도 있습니다.

**가상 위치 매니저 (외부 시스템)**

```kotlin
// 외부 시스템: 콜백을 통해 위치를 업데이트하는 가상의 매니저
data class Location(val latitude: Double, val longitude: Double)

interface LocationListener {
    fun onLocationUpdate(location: Location)
}

class LocationManager {
    private var listener: LocationListener? = null

    fun registerListener(l: LocationListener) {
        listener = l
        // 💡 최초 위치를 즉시 제공한다고 가정
        l.onLocationUpdate(Location(37.5665, 126.9780)) // 서울 시청
    }

    fun unregisterListener() {
        listener = null
    }

    // 외부에서 임의로 위치를 변경시키는 함수 (실제로는 GPS 갱신으로 발생)
    fun simulateLocationChange(newLocation: Location) {
        listener?.onLocationUpdate(newLocation)
    }
}
```

**produceState를 사용한 위치 구독 함수**

```kotlin
@Composable
fun observeCurrentLocation(manager: LocationManager, initialLocation: Location): State<Location> {
    // [1] produceState 시작: 초기 값(initialLocation)을 설정하고 코루틴 스코프 제공
    return produceState(initialValue = initialLocation, key1 = manager) {
        
        // [2] 콜백 리스너 정의: LocationManager가 위치를 업데이트하면 produceState의 'value'를 갱신
        val listener = object : LocationListener {
            override fun onLocationUpdate(location: Location) {
                // 💡 이 코드를 통해 Compose State 값이 업데이트되고 Recomposition이 발생합니다.
                value = location 
            }
        }

        // [3] 리스너 등록 (Effect 시작)
        manager.registerListener(listener)

        // [4] onDispose 블록: Composable이 제거되거나 'manager' 키가 변경될 때 정리 작업 실행
        awaitDispose {
            manager.unregisterListener() // 리스너 해제
        }
    }
}
```

**Composable에서 활용**

```kotlin
@Composable
fun LocationDisplayScreen() {
    val locationManager = remember { LocationManager() }
    
    // 초기 위치를 '0.0, 0.0'으로 설정하고, observeCurrentLocation을 통해 실제 위치를 구독
    val locationState = observeCurrentLocation(
        manager = locationManager,
        initialLocation = Location(0.0, 0.0) 
    )
    
    val location = locationState.value // State의 현재 값 참조
    
    // UI 로직 (State 값이 변경될 때마다 자동 업데이트됨)
    Column(Modifier.padding(16.dp)) {
        Text("현재 위치 정보", style = MaterialTheme.typography.h6)
        Text("위도 (Latitude): ${location.latitude}")
        Text("경도 (Longitude): ${location.longitude}")

        Spacer(Modifier.height(16.dp))

        // 위치 변경 시뮬레이션 버튼
        Button(onClick = {
            val newLat = location.latitude + 0.001
            val newLon = location.longitude + 0.001
            // 💡 외부 매니저의 상태를 변경하여, 콜백을 통해 Compose 상태가 갱신되도록 유도
            locationManager.simulateLocationChange(Location(newLat, newLon))
        }) {
            Text("위치 시뮬레이션 갱신")
        }
    }
}
```

`produceState` 는 실무에서 활용 범위가 넓으므로 유용하게 사용할 수 있습니다.

## derivedStateOf

`derivedStateOf` 는 상태가 너무 자주 바뀌어서 리컴포지션이 자주 불리는 문제가 있을 경우 사용됩니다.  
스크롤 위치와 같은 상태는 자주 변경되는 항목이지만 내가 필요로 하는건 특정 임계치 이상일 때에만 UI를 변경 시켜줘야하는 경우가 있을 때 일단적인 State 는 너무 자주 바뀌어서 리컴포지션이 여러번 호출되어 오버헤드가 발생하니, 이럴 때에는 derivedStateOf 를 사용해서 특정 임계치 일때만 방응 하도록 할 수 있습니다.(Flow를 사용해봤다면 `distinctUntilChanged()` 와 유사하다고 생각하시면 됩니다.)  
단, `derivedStateOf` 는 공식 문서에서도 강조하길 비용이 많이드는 작업이므로 꼭 불필요한 리컴포지션 방지를 위해서만 사용해야지, A상태와 B상태를 합쳐서 새로운 상태를 만들때와 같은 의도와 다른 사용은 피해야합니다.(안티 패턴)

### 올바른 사용 예시

```kotlin
@Composable
fun MessageList(messages: List<Message>) { // MessageList 함수는 메시지 목록을 매개변수로 받습니다.
    Box {
        val listState = rememberLazyListState() // LazyColumn의 스크롤 상태를 기억합니다.
        LazyColumn(state = listState) {
            // ... 메시지 아이템들 ...
        }
        
        // 첫 번째 보이는 항목이 첫 번째 항목(index 0)을 지났을 때 버튼을 표시합니다.
        // 불필요한 리컴포지션을 최소화하기 위해, 
        // remembered derived state 를 사용합니다.
        val showButton by remember { 
            // derivedStateOf를 사용하여 불필요한 리컴포지션을 최소화합니다.
            derivedStateOf { 
                listState.firstVisibleItemIndex > 0 // 첫 번째 보이는 항목의 인덱스가 0보다 클 때 (즉, 목록이 스크롤되어 상단이 안 보일 때)
            }
        }
        
        AnimatedVisibility(visible = showButton) {
            ScrollToTopButton() // "맨 위로 스크롤" 버튼 표시
        }
    }
}
```

derivedStateOf는 내부 상태(listState.firstVisibleItemIndex > 0)의 결과가 실제로 변경될 때만 showButton이라는 State 객체를 업데이트하도록 보장합니다. (true->false, flase->true 일 때 리컴포지션)

### 잘못된 사용

두 개의 Compose 상태를 결합해서 사용하는 잘못된 경우

```kotlin
// ⚠️ 사용하지 금지. derivedStateOf의 잘못된 사용 예시입니다.
var firstName by remember { mutableStateOf("") } 
var lastName by remember { mutableStateOf("") } 

// ❌ 나쁜 사용: derivedStateOf를 사용하여 불필요하게 fullName을 계산합니다.
// (firstName이나 lastName이 변경될 때마다 fullNameBad의 'State 객체'가 업데이트되고 리컴포즈를 유발합니다.)
val fullNameBad by remember { derivedStateOf { "$firstName $lastName" } } 

// ✅ 올바른 사용: 이 방법이 가장 단순하고 효율적입니다.
// (firstName이나 lastName이 변경되면 이 Composable이 리컴포즈될 때 fullNameCorrect가 자동으로 최신 값을 계산합니다.)
val fullNameCorrect = "$firstName $lastName"
```

fullNameBad의 문제점:
1. firstName이나 lastName 중 하나가 변경되면, 컴포저블 함수 전체가 리컴포즈됩니다.
2. 이 리컴포지션 과정에서 fullNameBad의 **내부 블록("$firstName $lastName")**이 어차피 다시 실행되어 새로운 전체 이름이 계산됩니다.
3. derivedStateOf는 이렇게 이미 리컴포지션되는 상황에서, 계산된 결과를 또 다른 State 객체로 한 번 더 감싸서 관리하므로, **불필요한 오버헤드** 만 추가하게 됩니다.

# snapshotFlow

`snapshotFlow` 는 Compose State 를 Flow 로 바꿔줍니다.(Compose State → Flow)  
Flow 의 강력한 연산자(예: debounce, filter, map)를 사용하여 코루틴 환경에서 처리하기 위해 사용합니다.
collect 연산자를 사용하여 로그를 전달하는 등 작업을 처리할 때 주로 사용합니다.  
단, collect 에서 상태를 변경하는 행위는 안티 패턴으로 **양방향 상태 순환(Circular State Dependency)** 를 유발해 버그(무한 리컴포지션, 성능 저하)를 발생 시킬 수 있습니다.

```kotlin
val listState = rememberLazyListState()

LazyColumn(state = listState) {
    // ...
}

LaunchedEffect(listState) {
    snapshotFlow { listState.firstVisibleItemIndex }
        .map { index -> index > 0 }
        .distinctUntilChanged()
        .filter { it == true }
        .collect {
            // 이벤트 전송
            MyAnalyticsService.sendScrolledPastFirstItemEvent()
        }
}
```

# SideEffects API 사용시 주의 사항

LaunchedEffect, produceStateof, DisposableEffect 와 같은 SdieEffects는 키를 가지고 효과를 재시작할 수 있다.

이 API 들은 아래와 같은 형태를 취합니다.
```kotlin
EffectName(restartIfThisKeyChanges, orThisKey, orThisKey, ...) { block }
```

이 때 key 를 설정해주는 것에 따라 동작이 미묘하게 달라져 문제가 발생할 수 있습니다.
- 필요한 것보다 적은 효과를 앱에 버그가 발생할 수 있습니다.
    - 사용자 ID(userId)가 변경되었지만 key에 누락되어, Effect는 이전 사용자 ID로 네트워크 요청을 계속 보내는 경우
    - viewLifecycleOwner 같은 인수가 key에서 빠지면, 화면이 재생성될 때마다 이전 리스너가 해제되지 않은 상태에서 새로운 리스너가 계속 추가되어 메모리 누수나 이벤트 중복 발생합니다.
    - 분석 로그를 기록하는 SideEffect에서 현재 화면의 카테고리(currentCategory)가 변경되었는데도 key에 없어, 오래된 카테고리 이름으로 로그가 기록됩니다.
- 필요한 것보다 많은 효과를 다시 시작하면 비효율적일 수 있습니다.
  - 화면에 진입할 때 한 번만 로드하면 되는 사용자 프로필 데이터가 있지만, LaunchedEffect의 key에 **자주 변경되는 UI 상태** 같은 것을 포함하는 경우.

# 마무리

이렇게 공식문서에 나와있는 API 들을 정리해 봤습니다.  
이 API들을 이해하는 것은 Compose에서 **비동기 작업**, **외부 시스템과의 통합**, **생명 주기 관리**, 그리고 **불필요한 리컴포지션 방지**라는 네 가지 주요 과제를 해결하는 데 필수적입니다.  
자세히 정리하려고 조금 길어진 감이 있는데.. 요약하는 포스트도 하나 올려서 빠르게 볼수 있게 정리해 보겠습니다.