---
title: ComposeStudy - 05.내비게이션 기본 
date: "2025-11-26T20:46:12.1112"
description: "제트팩 컴포즈의 내비게이션에 대한 기본적인 사용 방법을 설명합니다.."
categories: ["안드로이드", "컴포즈"]
tags: ["android", "jetpack compose", "navigation", "네비게이션"]
---

# Compose Navigation

안드로이드 애플리케이션을 개발할 때 **화면 이동(Navigation)** 은 사용자 경험의 핵심 요소입니다.  
Compose 에서 화면 이동(Navigation)을 구현할 때, 사용자가 직접 화면에 대한 상태(State) 를 정의하고 이 상태 값을 변경하여 화면을 노출 시켜줄 수도 있지만, 이처럼 직접 구현하게 되면 **상태 저장**, **생명주기 관리**, **백 스택 관리** 등 고려해야 할 점이 복잡하게 늘어납니다. (viewModel 을 사용할 경우 `ViewModelStoerOwner` 의 구현 등)    
그러므로 Compose 에서는 쉽게 사용하기 공식 `navigation-compose` 라이브러리를 사용합니다.  
지금 부터 Comopse Navigation 의 기본적인 개념과 간단한 예시를 통해 라이브러리를 이해해 보도록 하겠습니다.  
> 본 내용은 Navigation2 를 기반으로 작성하였으며, Navigation3 는 추후에 다루도록 하겠습니다.

# Compose Navigation 의 핵심 가치

**1. Type-safe (타입 안전성)**

가장 큰 장점 중 하나입니다. 기존에는 화면 간 데이터(인자)를 전달할 때 String이나 Bundle을 사용하여 타입 오류가 발생하기 쉬웠습니다. 하지만 Compose Navigation은 Route 정의 시 인자의 타입을 명시할 수 있게 되어, 잘못된 타입의 데이터를 전달하려는 시도를 컴파일 시점에 잡아낼 수 있습니다.

**2. 상태 주도 (State-driven)**

Compose의 철학을 그대로 따릅니다. 화면 이동을 명령(Imperative)하는 것이 아니라, 내비게이션 상태(State)가 변경되면 그에 따라 화면(UI)이 자동으로 갱신됩니다. 이는 내비게이션 로직을 더욱 직관적이고 예측 가능하게 만듭니다.

**3. 단일 활동 아키텍처 (Single-Activity Architecture)**

Compose 앱은 모든 화면을 단일 Activity 내의 여러 Composable로 구성하는 것이 권장됩니다. Compose Navigation은 이 단일 Activity 내에서 여러 화면 컴포저블 간의 전환을 효율적으로 관리하여, 앱의 복잡성을 줄이고 성능을 개선하는 데 기여합니다.

# Library Settings

```kotlin
dependencies {
    val nav_version = "2.9.6"

    implementation("androidx.navigation:navigation-compose:$nav_version")
}
```

# Compose Navigation 핵심 요소

이해를 위해 먼저 예제 코드를 확인해 보겠습니다.  

```kotlin
// HomeScreen 컴포저블
@Composable
fun HomeScreen(
    onNavigateToDetail: (itemId: Int) -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(text = "Home Screen", style = MaterialTheme.typography.headlineLarge)
        Spacer(modifier = Modifier.height(16.dp))
        Button(onClick = {
            // 버튼 클릭 이벤트 발생 -> 콜백 함수 호출 (상위 컴포저블에 네비게이션 요청)
            val itemId = 456
            onNavigateToDetail(itemId)
        }) {
            Text("Go to Detail (ID: 456)")
        }
    }
}

// DetailScreen 컴포저블
@Composable
fun DetailScreen(itemId: Int) {
    // ... DetailScreen 내용 ...
    Text(text = "Received Item ID: $itemId")
}
```

```kotlin

// Route: Home 화면 Route (인자가 없으면 빈 클래스)
@Serializable
object HomeRoute

// Route: Detail 화면 Route (인자는 클래스의 속성으로 정의)
@Serializable
data class DetailRoute(val itemId: Int)

// NavHost를 포함하는 메인 컴포저블
@Composable
fun AppNavigationTypeSafe() {
    // ⬅️ 핵심 요소 1: NavController 생성 및 상태 저장 (네비게이션 엔진)
    val navController = rememberNavController()
    
    // ⬅️ 핵심 요소 2: 요소 2: NavHost - 네비게이션 영역 및 목적지(Route) 등록 컨테이너
    NavHost(
        navController = navController, 
        startDestination = HomeRoute
    ) {

        // Home 화면 등록
        composable<HomeRoute> {
            HomeScreen(
                // ⬅️ onNavigateToDetail 콜백 함수 정의
                onNavigateToDetail = { itemId ->
                    // 콜백이 호출되면, navController를 사용하여 실제 이동 실행
                    navController.navigate(DetailRoute(itemId = itemId))
                }
            )
        }

        // Detail 화면 등록 (DetailRoute 인자를 toRoute<T>()로 타입 안전하게 추출)
        composable<DetailRoute> { backStackEntry ->
            val route = backStackEntry.toRoute<DetailRoute>()
            DetailScreen(itemId = route.itemId)
        }
    }
}
```

>위 코드를 실무에서 쓰기에도 충분하겠지만 조금더 현대적인 네비게이션 구성을 확인하려면 [Now in Android]("https://github.com/android/nowinandroid") 코드를 참고한걸 추천드립니다.  

### 핵심요소1. NavController (네비게이션 컨트롤러)

**NavController** 는 네비게이션을 실제로 제어하고 관리하는 핵심 객체입니다.  

**역할**: 화면 전환(Navigation), 뒤로 가기(Pop), Back Stack(백 스택) 관리 등 모든 네비게이션 작업을 처리하는 네비게이션 엔진입니다.

**코드 내 위치**:
```kotlin
val navController = rememberNavController()
```

**코드 내 역할:**
* rememberNavController()를 통해 생성되어 컴포저블의 생명주기 동안 상태를 유지합니다.  
* HomeScreen의 콜백 함수 내에서 실제로 화면을 이동시키는 명령을 수행합니다: `navController.navigate(DetailRoute(itemId = itemId))`


### 핵심요소2. Route (경로/목적지 식별자)

**Route** 는 네비게이션이 도달할 **특정 화면(Destination)** 을 유일하게 식별하는 경로입니다. 전통적으로는 문자열을 사용했지만, 제공된 코드에서는 제가 선호하는 타입 안전성을 위해 `@Serializable` 클래스를 사용합니다.  

**역할**: 특정 목적지를 가리키는 **주소**의 역할을 합니다. 인자가 필요할 경우, 해당 인자를 Route 객체의 속성으로 포함합니다.

**코드 내 위치**:  
```kotlin
@Serializable
object HomeRoute

@Serializable
data class DetailRoute(val itemId: Int)
```

**코드 내 역할**:  
* `HomeRoute`는 인자가 필요 없는 홈 화면의 주소를 나타냅니다.  
* `DetailRoute(val itemId: Int)`는 `itemId라는` 인자를 포함하는 상세 화면의 주소를 나타냅니다. 네비게이션 시 이 객체를 전달하고 (`navController.navigate(DetailRoute(...))`), 목적지에서 다시 추출하여 사용합니다

### 핵심요소3. NavHost (네비게이션 호스트)

**NavHost** 는 네비게이션이 일어나는 영역을 정의하며, 현재의 `Route`에 해당하는 **실제 UI(Composable)** 를 표시하는 컨테이너입니다.

**역할**: 네비게이션 그래프(`NavGraph`)와 **NavController** 를 연결하고, 현재 상태에 따라 적절한 `NavDestination`의 컴포저블을 렌더링합니다.

**코드 내 위치**:  
```kotlin
NavHost(
    navController = navController, 
    startDestination = HomeRoute // 시작 지점
) {
    // ... 목적지 등록 ...
}
```

**코드 내 역할**:  
* `navController`와 연결되어 네비게이션 이벤트를 받습니다.  
* `startDestination`으로 앱이 시작될 때 처음 보여줄 화면을 지정합니다.  
* 빌더(`NavGraphBuilder.() -> Unit`)의 `composable<T>` 함수를 통해 목적지들을 등록합니다. (navController.createGraph(...) 통해 그래프 객체를 만들어서 전달주는 방법도 가능합니다.)


### 핵심요소4. NavDestination (네비게이션 목적지)

**NavDestination** 은 네비게이션을 통해 도달할 수 있는 하나의 독립된 화면 단위를 의미하며, 일반적으로 **특정 Composable** 을 감싸고 있습니다.

**역할**: 네비게이션 그래프 내의 노드(Node)입니다. `composable<T>` 블록 하나가 하나의 NavDestination을 생성합니다.

**코드 내 위치**:  
```kotlin
composable<HomeRoute> { 
    HomeScreen(...) 
} 
// 그리고
composable<DetailRoute> { 
    DetailScreen(...) 
}
```

**코드 내 역할**:  
* 각 `composable<T>` 블록은 `HomeRoute`와 `DetailRoute`라는 Route에 매핑되는 **개별적인 목적지** 를 정의합니다.  
* 이 목적지 내부에 `HomeScreen`과 `DetailScreen` 컴포저블이 위치합니다.


### 핵심요소5. NavGraph (네비게이션 그래프)
**NavGraph** 는 앱 내의 모든 NavDestination**들을 모아 연결해** 놓은 집합체로, **네비게이션의 구조**를 정의합니다.

**역할**:   
앱의 모든 화면(Destination)과 그 화면들 간의 이동 가능한 경로(Action)를 정의하는 **지도 또는 청사진** 입니다. `NavHost` 내의 블록 자체가 하나의 그래프를 구성합니다.

**코드 내 위치**:  
```kotlin
NavHost(...) {
    // 이 블록 전체가 NavGraph를 정의합니다.
    composable<HomeRoute> { ... }
    composable<DetailRoute> { ... }
}
```
**코드 내 역할**:  
* NavHost의 블록({}) 내에 등록된 모든 `composable` 목적지들을 포함하여 **"이 앱에서는 HomeRoute와 DetailRoute로 이동할 수 있다"** 는 전체 구조를 NavController에게 제공합니다.  
* `startDestination = HomeRoute`는 이 그래프의 시작점을 명시합니다.