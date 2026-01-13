---
title: '::compose:: Navigation3 핵심개념 살펴보기'
date: "2025-12-16T22:02:55.1112"
description: "Jetpack Navigation3의 핵심적인 개념과 전반적인 사용방법을 살펴봅니다."
categories: ["안드로이드", "컴포즈"]
tags: ["android", "jetpack compose", "navigation", "네비게이션", "nav3"]
featuredImage: "./resources/heroimage_navigation3.svg"
---

최근 **Navigation 3** 의 안정화 버전이 출시되었습니다. 기존 Navigation 2에서 느꼈던 **복잡함**과 **다중 패널 구현의 한계**가 크게 개선되었는데요. 직접 사용해 보니 백스택(Backstack)을 개발자가 직접 제어할 수 있게 되어, 훨씬 직관적이고 간결하다는 인상을 받았습니다.  

이번 포스팅에서는 Navigation 3의 핵심 개념을 가볍게 정리해 보겠습니다.

# Jetpack Navigation 3, 무엇이 달라졌고 왜 필요한가?
기존 `Navigation 2`는 `NavGraph`, `NavController`, `Destination` 등의 요소를 통해 **백스택을 간접적으로 관리** 하며 화면 이동을 처리했습니다. 이러한 구조는 본래 전통적인 액티비티(Activity)와 프래그먼트(Fragment) 환경을 지원하기 위해 설계된 것으로 알고 있습니다. 

하지만 이 과정에서 안드로이드 프레임워크와의 결합도가 높아졌고, 현대적인 선언형 UI(Compose) 환경에서는 구현 복잡도가 불필요하게 증가하는 원인이 되었습니다. Navigation 3는 바로 이러한 한계를 극복하고, 컴포즈 환경에 맞게 더 선언적이고 유연한 구조를 제공하기 위해 등장했습니다. 

**핵심 개선 사항**
-   **명확한 백스택(Back Stack) 제어 및 투명성**: Nav2는 `navigate()`나 `popBackStack()` 같은 **명령** 을 내려 화면을 컨트롤 하였습니다. Nav3 에서는 백스택을 상태(State)로 취급하여 개발자가 내부를 투명하게 들여다보고 조작할 수 있게 합니다.
-   **유연한 다중 패널 및 폴더블 디바이스 대응**: Nav2는 기본적으로 '하나의 화면'을 다른 '하나의 화면'으로 교체하는 방식에 최적화되어 있습니다. 태블릿이나 폴더블처럼 여러 화면을 동시에 보여주거나, 특정 영역만 동적으로 교체해야 하는 복잡한 UI를 구현하기에는 유연성이 부족했습니다. Nav3 에서는 `SceneStragegy`를 통해 다중 패널 환경의 화면 처리를 훨씬 유연하게 다룰 수 있도록 돕습니다.

정리하자면, Navigation 3는 불투명했던 구조에서 벗어나 개발자가 백스택의 상태를 명확하게 읽고 제어할 수 있는 **투명하고, 유연하며, 확장 가능한 새로운 아키텍처**를 제공합니다.  

이어서 Navigation 3의 핵심적인 구성 요소에 대해 자세히 살펴보겠습니다

# Nav3의 핵심 변경 사항: 백 스택

Nav3 이해하기 위한 첫 번째 **'백 스택'** 에 대해서 알아보겠습니다.

## '백 스택(Back Stack)' 이란?
 백 스택은 사용자가 앱 내에서 이동한 화면들을 보관하는 보관소입니다. 
 - 화면 이동: 새로운 화면으로 이동하면 스택의 가장 위에 정보가 쌓입니다.
 - 뒤로 가기: 뒤로 가기 버튼이나 제스처를 사용하면 최상단의 화면을 제거(Pop)하고 바로 아래에 있던 이전 화면을 보여줍니다.
  

 ![back-stack](./resources/back-stack.png)

백 스택에는 실제 컨텐츠를 담을 수도 있고 콘텐츠에 필요한 정보만 담을 수도 있으며, 화면 이동에 필요한 Key만 담을 수도 있으나, **Navigation3 에서는 Key** 만을 담는 방식으로 선언형 UI에 환경에 더 잘 맞게 설계되었습니다.

아래 코드는 기본적인 백 스택 구현 코드입니다.

```kotlin
object ListScreen
data class DetailScreen(val id: String)

@Composable
fun MyApp() {
    // back stack 생성
    val backstack = remember { mutableStateListOf<Any>(ScreenA) }

    // NavDisplay를 사용한 백스택으로 화면 그리기
    // ..생략.. 

    // 화면 이동(Push)
    backStack.add(ScreenB("myId"))

    // 뒤로 가기(Pop)
    backStack.removeLastOrNull()
}

```

# Nav3 에서 콘텐츠를 관리하는 법: NavEntry

`NavEntry`는 **키**와 해당 Key가 나타내는 **콘텐츠**를 **유지**하고 **저장**하는 합니다..

``` kotlin
<T : Any> NavEntry(
    key: T,
    contentKey: Any,
    metadata: Map<String, Any>,
    content: @Composable (T) -> Unit
)
```

`key` 와 `content` 는 필수입니다. 
- `key`: Back Stack에서 사용하는 Key와 동일하며, 특정 엔트리를 식별하는 고유 값입니다.
- `contentKey`: 콘텐츠의 고유 식별자입니다. 주로 화면 전환(Transition) 애니메이션을 적용하거나, 동일한 Key 내에서 UI 구성을 구분 및 캐싱하는 기준점으로 사용됩니다.
- `metadata`: 화면과 관련된 부가 정보(예: 페이지 타이틀, 특정 UI 요소 노출 여부 등)를 담는 Map입니다. 네비게이션 로직 외부에서 화면의 상태를 참조할 때 유용합니다.
- `content`: 실제로 화면에 그려질 @Composable UI 블록입니다. 매개변수로 전달받은 key(T)를 활용하여 화면을 구성합니다.

`NavEntry` 를 만드는 방식을 두 가지가 있습니다.  
하나는 직접 `when` 문을 사용하여 key에 따라 분기처리하는 방법과 `entryProvider` DSL 을 사용하는 방법입니다.  
`entryProvider` DSL 를 사용하는 방법만 간단하게 살펴봅시다.
```kotlin
entryProvider = entryProvider {
    entry<ListScreen> { Text("List Screen") }
    entry<DetailScreen>(
        metadata = mapOf("extraDataKey" to "extraDataValue")
    ) { key -> Text("Target ID: ${key.id} ") }
}
```

# 화면을 보여주는 창: NavDisplay

마지막으로 `NavDisplay` 에 대해서 살펴보겠습니다.  
`NavEntry`가 '무엇을 보여줄 것인가'에 대한 상태 데이터라면, **`NavDisplay`는 그 상태를 '어떻게 화면에 그릴 것인가'를 결정**하는 역할입니다.  
백 스택의 상태를 관찰하고, 현재 최상단에 있는 NavEntry를 실제 UI로 렌더링하는 역할을 합니다.  

아래는 **백 스택**, **NavEntry**, **NavDisplay** 관계를 잘 보여주는 공식문서의 data flow 입니다.

 ![back-stack](./resources/nav3-data-flow.png)

코드로 간단히 살펴보면 아래와 같습니다.

```kotlin
@Composable
fun <T : Any> NavDisplay(
    backstack: List<T>,
    // ... 생략 ... ,
    entryProvider: (T) -> NavEntry<T>,
)
```
- `backstack`: 현재 앱에 쌓여 있는 화면 키(Key)들의 리스트입니다. NavDisplay는 이 리스트의 변화를 감지하여 화면을 갱신합니다.
- `entryProvider`: 주어진 key(T)를 바탕으로 그에 맞는 NavEntry를 생성하거나 찾아주는 로직입니다. "어떤 키에 어떤 화면을 보여줄지"를 연결하는 다리 역할을 합니다.
- **기타**: 뒤로가기 처리를 위한 onBack, 전체 화면 이동 애니메이션을 처리하기 위한 transitionSpec 등의 파라미터가 있습니다.

이제 핵심 개념인 **백 스택**, **NavEntry**, **NavDisplay** 는 모두 정리되었습니다.  
그러나 이것만으로는 안드로이드에서 **'구성 변경'** 및 **'프로세트 종료'** 와 같은 상황에서 백스택을 유지할 수 없습니다.  
다음으로 상태 저장을 위한 필요한 요소들을 살펴봅니다.

# 화면 상태 저장/관리: NavKey 인터페이스

**'구성 변경(화면 회전)'** 및 **'프로세트 종료(메모리 부족에 의한 종료)'** 에서 앱에 다시 진입하여 액티비티가 다시 그려지게 되면 액티비티가 파괴되고 다시 생성됩니다. 그 과정에서 Composable 또한 파괴되어 백 스택이 초기화 됩니다.  
이러한 상황을 대처하기 위해 Nav3 에서는 **저장 가능한** 백 스택을 제공하는는 `NavKey` 인터페이스와 `rememberNavBackStack` 를 사용합니다.

```kotlin
@Composable
fun rememberNavBackStack(vararg elements: NavKey): NavBackStack<NavKey>

@Serializable
class NavBackStack<T : NavKey> : MutableList<T>, StateObject
```

`rememberNavBackStack` 는 내부적으로 rememberSaveable 을 사용합니다.  

`rememberNavBackStack` 가 올바르게 작동하려면 백 스택의 각 키가 특정 요구사항을 준수해야 합니다.
- **NavKey 인터페이스**: 백 스택의 모든 키는 NavKey 인터페이스를 구현해야 합니다. 이는 키를 저장할 수 있음을 라이브러리에 알리는 마커 인터페이스 역할을 합니다.
- **@Serializable**: NavKey를 구현하는 것 외에도 키 클래스와 객체는 @Serializable 주석으로 표시해야 합니다.

```kotlin
@Serializable
data object ScreenA : NavKey

@Serializable
data object ScreenB : NavKey

@Composable
fun NavBackStack() {
    val backStack = rememberNavBackStack(ScreenA)
}
```

> 백스택 자체를 ViewModel 에 저장하는 대안이 있으나 따로 다루지는 않겠습니다.

# 저장 범위 지정하기

## rememberSavable의 수명주기를 entry에 맞추기(필수)
`rememberSaveableStateHolderNavEntryDecorator`를 사용하여 **상태 저장의 주인(Owner)** 을 **해당 화면(Entry)** 으로 지정할 수 있습니다.  
`rememberSaveableStateHolderNavEntryDecorator`를 사용하지 않으면 모든 데이터가 `Activity`에 저장되어 화면을 뒤로 가기로 나갔다 들어와도 옛날 데이터가 남아있을 수 있습니다. 반면, 이를 사용하면 데이터가 **해당 화면(Entry)** 이 죽을 때 같이 깔끔하게 사라집니다.

아래 예시는 `NavDisplay` 에 `entryDecorators` 로 `rememberSaveableStateHolderNavEntryDecorator` 를 사용하지 않았을 경우의 문제입니다.
```kotlin
@Composable
fun AppNavigation() {
    val backStack = rememberNavBackStack(HomeKey)

    NavDisplay(
        backStack = backStack,
        // entryDecorators = emptyList() // 기본값
        entryProvider = entryProvider {
            entry<HomeKey> {
                HomeScreen(onSearch = { backStack.add(SearchKey) })
            }
            entry<SearchKey> {
                SearchScreen()
            }
        }
    )
}

@Composable
fun SearchScreen() {
    // 이 값은 Activity가 살아있는 한 계속 저장됨
    // 화면을 나갔다(Back) 다시 들어와도 이전 입력값이 남아있을 위험이 있음
    var query by rememberSaveable { mutableStateOf("") }
    
    TextField(value = query, onValueChange = { query = it })
}
```

## viewModel의 수명주기를 entry에 맞추기
`rememberSaveable` 과 마찬가지로 `ViewModel` 을 사용한다면 `rememberViewModelStoreNavEntryDecorator` 를  `entryDecorators` 에 포함해야 합니다.
이 데코레이터는 각 네비게이션 엔트리(NavBackStackEntry)가 **독립적인 ViewModelStore를 소유**할 수 있도록 설정합니다. 이를 통해 ViewModel의 생명주기를 특정 화면(Entry)의 수명주기에 종속시킬 수 있으며, 화면이 백스택에서 완전히 제거될 때 관련 ViewModel 및 리소스가 올바르게 해제되도록 보장합니다.

## 설정 예시
아래와 같이 NavDisplay에 데코레이터들을 설정하여 사용할 수 있습니다.
```kotlin
NavDisplay(
    entryDecorators = listOf(
        // 각 화면 관리 및 상태 저장을 위한 기본 데코레이터 추가
        rememberSaveableStateHolderNavEntryDecorator(),
        // 개별 엔트리 단위의 ViewModel 생명주기 관리를 위한 데코레이터 추가
        rememberViewModelStoreNavEntryDecorator()
    ),
    backStack = backStack,
    entryProvider = entryProvider { },
)
```

# 마치며

지금까지 Android Navigation 3의 핵심 개념과 상태 관리 메커니즘을 가볍게 살펴보았습니다.
  
Navigation 2 를 사용해봤던 터라, Nav3가 더욱더 직관적으로 느껴졌습니다. 
특히 Kotlin Serialization을 활용한 타입 안정성과 멀티플랫폼, 다중 패널(Multi-pane) 환경까지 고려한 설계가 컴포즈에 정말 잘 녹여낸것 같아 인상 깊게 다가왔습니다.
이번 글에서 미처 다루지 못한 **멀티 모듈 프로젝트에서의 탐색 전략**, **화면 전환 애니메이션 처리**, 그리고 **커스텀 데코레이터(Custom Decorator)** 를 활용한 기능 확장 등은 공식 문서를 참고해 보시길 추천드립니다.

# 참고 자료

[Jetpack Navigation 3 공식 문서](https://developer.android.com/guide/navigation/navigation-3)