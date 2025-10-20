---
title: ComposeStudy - 01.컴포즈 이해  
date: "2025-10-20T21:14:03.284Z"
description: "안드로이드 공식 사이트의 '컴포트 이해' 를 이해하기 쉽게 정리합니다."
categories: ["안드로이드", "컴포즈"]
tags: ["android", "jetpack compose"]
---

# Compose 이해

참고: https://developer.android.com/develop/ui/compose/mental-model?hl=ko

### 들어가며

컴포즈 안드로이드 내에서 UI 를 개발하기 위한 새로운 선언형 프로그래밍 패러다임입니다.  
기존 안드로이드에서는 xml 을 이용한 명령형 패러다임으로 개발을 하였으나,  
명령형 UI 의 유지관리의 한계로 인해 선언형 UI가 만들어지면서 안드로이드에도 도입되었습니다.

### 선언형 UI 란?

선언형 UI를 알아보기 전 기존 명령형 UI 에 대해서 간단하게 설명하면  
명령형 UI 는 사용자와 상호작용 등의 이유로 앱의 상태(데이터)가 변경되면,  
해당 상태(테이터)를 반영하기 위해 `textView.setText(String)`, `container.addChild(View)` 과 같은 메소드를 통해 UI를 업데이트 했습니다.  
이러한 메소드는 **뷰의 상태**를 변경합니다.

이 상태가 앞으로 설명할 Compose 에서의 핵심 키워드입니다.  
상태는 시간이 지남에 따라 변할 수 있는 값을 의미하며,  
앱의 UI에 표시되어야 하는 데이터를 나타냅니다.  
예를 들어, 사용자가 입력한 텍스트, 버튼의 활성화 여부, 리스트의 아이템 등이  
모두 상태에 해당합니다.

명령형 UI에서는 상태가 변경될 때마다 개발자가 직접 UI를 업데이트하는 코드를 작성해야 했습니다.  
하지만 선언형 UI에서는 상태가 변경되면 자동으로 UI가 다시 그려지므로,  
개발자는 "어떻게" UI를 업데이트할지가 아니라 "어떤" UI를 보여줄지에만 집중할 수 있습니다.

### 간단한 기본 예제

```kotlin
@Composable
fun Greeting(name: Stirng) {
	Test("Hello $name")
}
```

이 예제는 화면에 name 이라는 매개변수를 받아서 Text 를 UI에 노출시킵니다.

주목할 점은

- `@Composable` 어노테이션을 지정합니다. 모든 컴포저블 함수는 이 주석이 있어합니다.
- 매견변수를 받을 수 있다.
- Text 컴포저블 함수를 호출하여 텍스트를 노출 시킨다.
- 함수는 아무것도 반환하지 않는다.
- 이 함수는 빠르고 **멱등성**을 가지며 부작용이 없다.

<aside>
💡

**멱등성(Idempotence):** 시스템, 연산 또는 함수가 **여러 번 적용되어도 한 번 적용한 것과 같은 결과**를 내는 속성(property)을 의미합니다.

</aside>

### 동적 콘텐츠 (**Dynamic content)**

컴포즈는 XML 대신 코틀린을 사용하므로 코틀린 코드처럼 동적으로 동작할 수 있다.(if, for, when 등을 사용하여 컨텐츠 구성)

### 재구성 (**Recomposition)**

컴포저블의 가장 핵심적인 개념입니다.

명령형 UI 모델에서 위젯을 변경하기 위해서 setter 를 호출한다.  
하지만 컴포저블에서는 새 데이터를 사용하여 컴포저블 함수를 다시 호출합니다.  
이렇게 하면 함수가 재구성되면(recompositon 이 호출 되면서) Compose 프레임워크는 필요한 컴포저블을 다시 그려줍니다.

```kotlin
@Composable
fun ClickCounter(clicks: Int, onClick: () -> Unit) {
    Button(onClick = onClick) {
        Text("I've been clicked $clicks times")
    }
}
```

버튼이 클릭 될때마다 clicks 값이 증가하며 clicks 을 사용하고 잇는 Text 컴포저블이 재구성 됩니다.

**재구성**(**Recomposition)**은 입력이 변경될 때 **컴포저블 함수를 다시 호출하는 프로세스**입니다.

이는 함수의 입력이 변경될 때 발생며, 새 입력 값을 기반으로 재구성할 때 변경되었을 수 있는 함수 또는 람다만 재구성하여 효율적으로 동작합니다.(불필요한 연산을 하지 않음)  
재구성(Recomposition)는 건너뛸 수 있으므로 컴포저블 함수의 부작용(Side Effect)에 의존해서는 안 된다.  
부작용(Side Effect)에 의존하게 되면 사용자가 앱에 예측할 수 없는 동작을 경험합니다.  
그렇다면 부작용(Side Effect)이란 무엇일까?   
부작용(Side Effect)은 앱의 나머지 부분에 표시되는 변경 사항이다.

아래와 같은 행위를 하면 안된다.

1. 공유 객체의 속성에 쓰기
2. `ViewModel`에서 식별 가능한 요소 업데이트
3. 공유 환경설정 업데이트

### 공유 객체의 속성 쓰기

**공유 객체**는 여러 컴포저블 함수가 접근하거나 수정할 수 있는 앱 전반의 객체입니다. 컴포저블 함수가 이 객체의 속성을 직접 수정하면, 재구성이 언제 일어날지 알 수 없으므로 상태가 일관성을 잃게 됩니다.

### 위험한 예제 (권장하지 않음 ❌)

아래 코드는 `Counter`라는 **전역 또는 공유 객체**의 `count`를 컴포저블 함수 내에서 직접 변경합니다.

```kotlin
// ❌ 위험! Composable 함수가 직접 외부의 공유 상태를 수정
object SharedCounter {
    var count: Int = 0
}

@Composable
fun BadCounterButton(name: String) {
    // 💡 부작용: 재구성 시 언제 실행될지, 몇 번 실행될지 예측 불가
    //           count 값 변경이 예상치 못한 시점에 발생할 수 있음
    Button(onClick = { 
        SharedCounter.count++ 
    }) {
        Text("Increment for $name")
    }
    Text("Current Shared Count: ${SharedCounter.count}")
}
```

### 왜 위험한가요?

1. **예측 불가한 실행:** Compose는 필요하지 않으면 `BadCounterButton` 함수 실행을 건너뛸 수 있습니다. 만약 이 함수가 건너뛰어지면, 버튼 클릭 시 `SharedCounter.count++` 코드는 실행되지 않아 **UI는 업데이트되지만, 실제 데이터는 업데이트되지 않는** 상태 불일치가 발생합니다.
2. **다중 실행:** 때로는 재구성이 여러 번 빠르게 일어날 수 있습니다. 버튼을 한 번 눌렀는데 `count`가 2 이상 증가하는 등 **데이터 손상**을 일으킬 수 있습니다.

그렇다면 어떠한 코드가 올바른 코드일까요?

### 1-1 Composable 내부에서 상태를 관리하는 방법

가장 간단한 경우에는, 상태를 **`remember`**를 사용하여 컴포저블 내부에 저장하고, 상태 업데이트를 **`onClick` 이벤트** 안에서 처리하면 됩니

```kotlin
@Composable
fun GoodCounterButtonLocal(name: String) {
    // 1. 상태를 'remember'를 사용하여 컴포저블 내부에 저장 (안전)
    //    'remember' 덕분에 재구성 시에도 값이 유지됨
    var count by remember { mutableStateOf(0) }

    Button(
        // 2. 상태 변경(부작용)을 'onClick' 이벤트 핸들러 내부에서만 실행
        onClick = {
            // 이 코드는 버튼이 클릭될 때만 실행되며, 재구성 시에는 실행되지 않음
            count++
        }
    ) {
        Text("Increment for $name")
    }

    // 3. Composable 함수 본문은 오직 상태(count)를 읽어서 UI를 그리는 역할만 수행
    Text("Current Local Count: $count")
}
```

### 설명

- **안전성:** 상태 변경(`count++`)이 **오직 사용자 상호작용(버튼 클릭) 시점**에만 실행되는 **이벤트 핸들러** 내부에 격리됩니다.
- **순수성:** 컴포저블 함수 본문(`GoodCounterButtonLocal`)은 단지 입력 상태(`count`)를 받아서 출력(UI)을 만드는 **순수한 함수** 역할을 합니다.

### 1-2 외부 공유 상태를 ViewModel로 관리하는 방법 (권장되는 패턴)

앱의 여러 부분이 접근해야 하는 **"공유 상태"**를 관리하려면, **`ViewModel`**을 사용하는 것이 가장 표준적이고 안전한 방법입니다.

뷰모델

```kotlin
// 상태를 관리하고 비즈니스 로직을 포함하는 상태 홀더
class CounterViewModel : ViewModel() {
    // 💡 1. MutableState를 private으로 정의하여 외부 직접 수정을 막음
    private val _sharedCount = mutableStateOf(0)

    // 💡 2. 외부에는 읽기 전용 State<Int>로 노출
    val sharedCount: State<Int> = _sharedCount

    // 💡 3. 상태를 변경하는 함수(이벤트 핸들러)를 노출
    fun incrementCount() {
        _sharedCount.value++
    }
}
```

컴포저블 구현

```kotlin
@Composable
fun GoodCounterButtonShared(
    // 💡 ViewModel을 의존성 주입 받음 (Hilt 등을 사용하거나, Compose의 viewModel() 함수 사용)
    viewModel: CounterViewModel = viewModel()
) {
    //  1. ViewModel의 상태를 관찰
    val currentCount = viewModel.sharedCount.value

    Button(
        //  2. 상태 변경(부작용)을 ViewModel의 함수(이벤트)를 통해 호출
        onClick = {
            // 이 코드는 버튼 클릭 시 ViewModel의 상태 변경 함수를 호출함
            viewModel.incrementCount()
        }
    ) {
        Text("Increment Shared Counter")
    }

    //  3. Composable 함수 본문은 오직 ViewModel의 상태를 읽어서 UI를 그림
    Text("Current Shared Count: $currentCount")
}
```

설명

- **상태 격리:** **`SharedCounter` 객체 대신 `ViewModel`*이 상태를 안전하게 관리합니다.
- **단방향 데이터 흐름 (Unidirectional Data Flow, UDF):**
    - **이벤트:** UI (`Button`)에서 **이벤트** (`incrementCount()`)를 발생시켜 ViewModel로 보냅니다.
    - **상태:** ViewModel이 상태를 업데이트하고, 상태가 다시 UI로 흘러 들어와 **재구성(Recomposition)**이 발생합니다.
- **Compose 원칙 준수:** 컴포저블 함수는 **상태를 읽기만 할 뿐** 상태를 직접 변경하는 부작용을 일으키지 않습니다. 상태 변경은 ViewModel의 이벤트 함수 내에서 안전하게 처리됩니다.