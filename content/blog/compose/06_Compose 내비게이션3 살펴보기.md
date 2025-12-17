---
title: "ComposeStudy - 06. 내비게이션3 살펴보기"
date: "2025-12-16T22:02:55.1112"
description: "Jetpack Navigation3의 핵심적인 개념과 새로운 멘탈 모델을 살펴봅니다."
categories: ["안드로이드", "컴포즈"]
tags: ["android", "jetpack compose", "navigation", "네비게이션", "nav3"]
---

최근 **Navigation 3** 의 안정화 버전이 출시되었습니다. . 기존 Navigation 2에서 느꼈던 복잡함과 다중 패널 구현의 한계가 크게 개선되었는데요. 직접 사용해 보니 백스택(Backstack)을 개발자가 직접 제어할 수 있게 되어, 훨씬 직관적이고 간결하다는 인상을 받았습니다. 이번 포스팅에서는 Navigation 3의 핵심 개념을 가볍게 정리해 보겠습니다.

# Jetpack Navigation 3, 무엇이 달라졌고 왜 필요한가?
기존 `Navigation 2`는 `NavGraph`, `NavController`, `Destination` 등의 요소를 통해 **백스택을 간접적으로 관리** 하며 화면 이동을 처리했습니다. 이러한 구조는 본래 전통적인 액티비티(Activity)와 프래그먼트(Fragment) 환경을 지원하기 위해 설계된 것으로 알고 있습니다. 

하지만 이 과정에서 안드로이드 프레임워크와의 결합도가 높아졌고, 현대적인 선언형 UI(Compose) 환경에서는 구현 복잡도가 불필요하게 증가하는 원인이 되었습니다. Navigation 3는 바로 이러한 한계를 극복하고, 컴포즈 환경에 맞게 더 선언적이고 유연한 구조를 제공하기 위해 등장했습니다. 

**핵심 개선 사항**
-   **명확한 백스택(Back Stack) 제어 및 투명성**: Nav2는 `navigate()`나 `popBackStack()` 같은 **명령** 을 내려 화면을 컨트롤 하였습니다. Nav3 에서는 백스택을 상태(State)로 취급하여 개발자가 내부를 투명하게 들여다보고 조작할 수 있게 합니다.
-   **유연한 다중 패널 및 폴더블 디바이스 대응**: Nav2는 기본적으로 '하나의 화면'을 다른 '하나의 화면'으로 교체하는 방식에 최적화되어 있습니다. 태블릿이나 폴더블처럼 여러 화면을 동시에 보여주거나, 특정 영역만 동적으로 교체해야 하는 복잡한 UI를 구현하기에는 유연성이 부족했습니다. Nav3 에서는 `SceneStragegy`를 통해 다중 패널 환경의 화면 처리를 훨씬 유연하게 다룰 수 있도록 돕습니다.

정리하자면, Navigation 3는 불투명했던 구조에서 벗어나 개발자가 백스택의 상태를 명확하게 읽고 제어할 수 있는 **투명하고, 유연하며, 확장 가능한 새로운 아키텍처**를 제공합니다.  

이어서 Navigation 3의 핵심적인 구성 요소에 대해 자세히 살펴보겠습니다

# Nav3의 핵심 멘탈 모델: NavEntry와 백스택

Nav3를 이해하기 위한 첫걸음은 '백스택'의 재정의부터 시작합니다.

-   **백스택의 재정의**: Nav3에서 백스택은 더 이상 눈에 보이는 Fragment나 Activity의 스택이 아닙니다. **`NavEntry`라는 상태 객체들의 리스트**입니다. 더 정확히는, 각 `NavEntry`를 식별하는 **고유한 키(예: `NavKey`)들의 스택**이라고 할 수 있습니다. 이 키는 단순한 문자열(Route)을 넘어, 타입 안정성을 갖춘 데이터 클래스가 될 수 있습니다. 이는 백스택이 '어떤 화면들의 기록'이라는 개념에서 **'어떤 상태(State)들의 기록'** 이라는 개념으로 확장되었음을 의미합니다.

-   **핵심 구성 요소: `NavEntry`**:
    -   **`NavEntry`란?**: 특정 `Destination`(화면)으로 가기 위한 모든 **상태(State)를 담고 있는 컨테이너**입니다. 단순히 '어떤 화면'이라는 정보만 갖는 것이 아니라, 그 화면에 전달될 인수(arguments), 현재 생명주기(Lifecycle), 저장된 상태(SavedState), 그리고 해당 화면에 종속된 ViewModel까지 모두 포함합니다.
    -   **역할**: `NavEntry`는 화면 표시를 넘어, **자신의 생명주기(Lifecycle)를 직접 관리**하며, `ViewModel`의 스코프(Scope)를 정의하는 핵심 객체입니다. `NavEntry`가 백스택에 존재하는 한, 그 상태와 ViewModel은 살아있습니다.

-   **백스택 다루기**:
    -   Nav2에서는 `NavController`에 명령을 내리고 결과를 기다리는 블랙박스 방식이었다면, Nav3에서는 `NavController.backstack` 프로퍼티를 통해 **현재 백스택에 있는 모든 `NavEntry`의 리스트를 직접 읽을 수 있습니다.** 개발자는 이 리스트를 관찰하며 현재 어떤 화면들이 어떤 상태로 쌓여있는지 명확하게 파악하고, 필요하다면 이 스택을 직접 조작하여 특정 `NavEntry`를 제거하거나 순서를 변경하는 등 정밀한 제어가 가능해졌습니다. 이것이 Nav2와의 가장 혁신적인 차이점입니다.

# 화면 표시 방법의 추상화: NavDisplay

`NavEntry`가 '무엇을 보여줄 것인가'에 대한 상태 데이터라면, **`NavDisplay`는 그 상태를 '어떻게 화면에 그릴 것인가'를 결정**하는 역할입니다.

-   **`NavDisplay`의 역할**: `NavDisplay`는 `NavEntry`가 정의하는 상태(어떤 화면, 어떤 데이터)를 가져와 **실제 UI로 렌더링하는 책임을 가진 인터페이스**입니다. 예를 들어, `FragmentNavDisplay`는 `NavEntry`를 Fragment로 표시하고, `ComposeNavDisplay`는 Composable 함수로 표시합니다.

-   **유연성의 극대화**: 이 추상화 덕분에 엄청난 유연성이 생깁니다.
    -   똑같은 `UserProfile`이라는 `NavEntry` 상태를 스마트폰에서는 전체 화면(Fragment)으로 보여주고, 태블릿에서는 화면의 오른쪽 패널에 작게 보여줄 수 있습니다. 이는 단지 **서로 다른 `NavDisplay` 구현체를 제공**함으로써 가능해집니다.
    -   **다중 패널 디바이스 구현의 용이성**: 왼쪽 내비게이션 패널과 오른쪽 콘텐츠 패널이 각자 독립적인 백스택을 가져야 할 때, 각각에 다른 `NavController`와 `NavDisplay`를 할당하여 손쉽게 구현할 수 있습니다. `NavEntry`라는 표준화된 상태 모델이 있기에 가능한 설계입니다.

# 확장성을 위한 설계: NavKey 인터페이스

Nav3는 개발자가 시스템을 자신의 비즈니스 로직에 맞게 확장할 수 있도록 `NavKey`라는 강력한 도구를 제공합니다.

-   **`NavKey`란?**: 백스택 내에서 각 `NavEntry`를 **고유하게 식별하는 키(Key) 역할을 하는 인터페이스**입니다. Nav2의 문자열 기반 라우트와 달리, `NavKey`는 타입 안정성을 갖춘 `Parcelable` 데이터 클래스로 정의할 수 있습니다.

    ```kotlin
    // Nav2 방식
    navController.navigate("profile/1234")

    // Nav3 방식 with NavKey
    @Parcelize
    data class ProfileKey(val userId: String) : NavKey

    navController.navigate(ProfileKey("1234"))
    ```

-   **커스텀 `NavKey`**: 개발자는 비즈니스 로직에 필요한 데이터를 담은 커스텀 `NavKey`를 자유롭게 정의할 수 있습니다. 이를 통해 백스택을 탐색하거나 조작할 때 훨씬 더 풍부한 컨텍스트를 활용할 수 있습니다.

-   **고급 사용 사례**: 예를 들어, 특정 주문 플로우(`OrderFlow`)와 관련된 모든 화면들을 한 번에 백스택에서 제거하고 싶다고 가정해봅시다. 관련 `NavKey`들이 `OrderFlowKey`라는 마커 인터페이스를 구현하도록 설계하면, 백스택을 순회하며 `is OrderFlowKey`인 `NavEntry`들을 손쉽게 찾아 제거하는 등의 정교한 제어가 가능해집니다.

# ViewModel 관리와 NavEntry

Nav3의 상태 관리 모델은 ViewModel의 생명주기와 스코프 관리 방식을 더욱 직관적으로 만들면서 완성됩니다.

-   **`NavEntry`와 ViewModel 스코프**:
    -   이제 ViewModel은 더 이상 Fragment나 Activity 같은 UI 컴포넌트의 생명주기에 종속되지 않습니다. 대신, **`NavEntry`의 생명주기에 맞춰 스코프가 지정됩니다.** 즉, `NavEntry`가 백스택에 생성될 때 ViewModel이 생성되고, 백스택에서 완전히 사라질 때 ViewModel의 `onCleared()`가 호출됩니다.
    -   과거 `navGraphViewModels()`를 통해 그래프 스코프에 의존했던 방식은, 이제 **특정 `NavEntry`를 기준으로 ViewModel을 생성하고 공유**하는 방식으로 더욱 명확해졌습니다. Hilt나 Koin 같은 의존성 주입 라이브러리들도 이러한 `NavEntry` 기반의 스코프를 지원합니다.

-   **이점**: 이 설계 덕분에, 화면이 교체되어 UI가 잠시 보이지 않더라도 해당 `NavEntry`가 백스택에 남아있는 한 ViewModel의 상태는 안전하게 보존됩니다. 사용자가 뒤로 가기 버튼을 눌러 이전 화면으로 돌아왔을 때, 모든 상태가 그대로 유지되는 경험을 아주 쉽게 구현할 수 있습니다.

Navigation 3는 단순히 API를 바꾼 것이 아니라, 내비게이션을 '상태 관리'의 관점에서 재해석한 결과물입니다. `NavEntry`라는 투명한 상태 홀더, `NavDisplay`라는 유연한 렌더링 추상화, 그리고 `NavKey`라는 확장 가능한 식별자를 통해 우리는 그 어느 때보다 복잡한 앱의 흐름을 예측 가능하고 견고하게 구축할 수 있게 되었습니다.