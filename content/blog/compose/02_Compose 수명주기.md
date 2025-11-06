---
title: ComposeStudy - 02.UI 아키텍쳐, 수명주기 이해하기
date: "2025-10-24T15:12:00.0000"
description: "안드로이드 공식 사이트의 'UI 아키텍쳐, 수명주기' 를 이해하기 쉽게 정리합니다."
categories: ["안드로이드", "컴포즈"]
tags: ["android", "jetpack compose"]
---

# Compose 수명주기 이해하기

참고: https://developer.android.com/develop/ui/compose/lifecycle?hl=ko

## 핵심 내용

1. 컴포저블의 수명 주기 3단계
2. 호출 사이트 (Call Site)를 통한 컴포저블 식별
3. 컴포저블 인스턴스 식별 및 리컴포지션 최적화 원리


## 1. 컴포저블의 수명 주기 3단계

컴포지션(Composition)은 컴포저블을 처음 실행할 때,  
UI를 설명하는 컴포저블 트리를 생성하는 과정입니다.  
이 생성된 컴포저블을 업데이트 하기 위해서는 상태를 변경 시켜  
리컴포지션(Recomposition)을 호출하는 것이 유일한 방법입니다.

리컴포지션은 일반적으로 `State<T>` 객체가 변경되면 트리거 되고  
Compose 는 이러한 객체를 추적하여 상태 변화시 리컴포지션을 호출하여  
`State<T>` 를 읽는 컴포저블을 업데이트힙니다.

컴포저블은 보통 Activity, View 등과 다르게 단순하게 세 가지의 수명 주기만을 가집니다.
- 컴포지션 시간(Enter the Compositon): 컴포저블이 처음 호출되어 UI 트리에 배치됩니다.
- 0회 이상 재구성(Recompose zero or more times): 상태 변경에 따라 컴포저블이 0번 또는 그 이상 다시 실행됩니다.
- 컴포지션 종료(Exit the Compotion): 컴포저블이 더 이상 필요하지 않게 되어 UI 트리에 제거됩니다.

컴포저블이 수명 주기가 더 복잡한 외부 리소스를 관리하거나 이와 상호작용해야 하는 경우 사이드 이펙트를 사용해야 합니다.

## 2. 호출 사이트 (Call Site)를 통한 컴포저블 식별

그렇다면 컴포저블의 두 번째 수명 주기 단계인  **'0회 이상 재구성(Recompose)'** 에서  
Compose가 어떤 인스턴스를 업데이트해야 할지, 혹은 건너뛰어야 할지 어떻게 알수 있을까요?  
이것을 구분하기 위해서 Compose는 각 컴포저블 호출에 **고유한 식별자** 를 부여합니다.  
이러한 식별자를 호출 사이트(Call site) 라고 합니다.  
호출 사이트는 컴포저블이 호출되는 **소스 코드의 정확한 위치** 를 의미합니다.
Compose 컴파일러는 이 위치를 기준으로 컴포지션 내에서 컴포저블의 특정 인스턴스를 식별합니다.

## 3. 컴포저블 인스턴스 식별 및 리컴포지션 최적화 원리

설명했듯이, Compose는 컴포지션 내 각 컴포저블 인스턴스를 호출 사이트를 통해 고유하게 식별합니다.  
이 식별 메커니즘은 단순히 UI를 생성하는 것을 넘어, 리컴포지션의 효율성을 극대화하는 핵심 원리가 됩니다.

### 3.1. 인스턴스 유지와 재사용
Compose는 UI 상태가 변경되어 리컴포지션이 발생할 때, 전체 UI를 처음부터 다시 그리지 않습니다. 대신, 변경이 필요한 특정 컴포저블만 선별적으로 재실행합니다.  

- 호출 사이트의 역할: 상태가 변경되어 부모 컴포저블이 재실행되더라도, 자식 컴포저블의 호출 사이트가 동일하게 유지된다면, Compose는 이전에 생성된 동일한 인스턴스를 식별하고 재사용합니다.

- 인스턴스의 변경: 만약 리컴포지션 시 조건문($if/else)이나 흐름 변경으로 인해 특정 컴포저블의 호출 사이트 자체가 사라지거나 새로운 위치에 호출된다면, Compose는 이전 인스턴스를 **제거(Exit the Composition)** 하고 새 인스턴스를 생성합니다.

### 3.2. 리컴포지션 건너뛰기(Skipping)의 조건
인스턴스를 유지하는 것만으로는 충분하지 않습니다.  
Compose는 성능을 위해 해당 인스턴스 실행 자체를 건너뛰어(Skip) 실행 비용을 0으로 만들려고 시도합니다.

Compose가 컴포저블의 재실행을 건너뛰는 조건은 매우 명확합니다.
1. 호출 사이트가 유지되어야 합니다. (인스턴스가 재사용될 수 있어야 함)
2. 해당 컴포저블이 받는 **모든 입력(매개변수)** 이 **안정적(Stable)** 이어야 합니다.
3. 입력 매개변수들의 값이 이전 호출과 비교했을 때 변경되지 않았어야 합니다. (비교는 주로 equals() 메서드를 사용합니다.)

        📝 참고: 안정적인 유형(Stable Type)이란?  
        컴포즈에게 "이 데이터는 한 번 생성되면 내용이 바뀌지 않거나,  
        만약 내용이 바뀌면 시스템에 확실히 알려줄 수 있다"고 약속하는 유형입니다.  
        원시 타입(Int, String 등), 불변(Immutable) 클래스,  
        그리고 MutableState<T> 등이 안정적인 유형으로 간주됩니다.  
        안정적이지 않은(Unstable) 타입은 값이 바뀌지 않았더라도  
        리컴포지션을 건너뛸 수 없게 만듭니다.


### 3.3. Key 컴포저블: 동일 호출 사이트에서의 식별

일반적으로 호출 사이트가 다르면 인스턴스도 다르게 식별되지만,  
`for` 루프나 목록처럼 하나의 호출 사이트 내에서 동일한 컴포저블이 여러 번 반복되어 호출되는 경우가 있습니다.

이때는 **호출 순서(Execution Order)** 가 인스턴스 식별에 사용됩니다.  
하지만 목록에서 항목을 추가/삭제/재정렬하면 호출 순서가 바뀌게 되고,  
이는 불필요한 리컴포지션이나 내부 상태가 꼬이는 버그를 유발할 수 있습니다.

아래 코드 예제를 보면
```kotlin
val test = remember { mutableStateListOf("가","나","다")}
Column() {
    Button(onClick = {
        Log.d("Woody", "Click Me")
        test.add(0,"라")
        // test.add(4) 일 때는 4에 대한 컴포저블 인스턴스만 생성됨
    }) {
        Text(text = "Click Me")
    }
    test.forEach { text ->
        NumberText(text)
    }
}
```

    Initial composition with text: 가
    Initial composition with text: 나
    Initial composition with text: 다
    Click Me
    Recomposition with text: 라
    Recomposition with text: 가
    Recomposition with text: 나
    Initial composition with text: 다

Index 0 에 "라" 를 추가했을 때  
4 번째 컴포저블에 "다" 라는 상태를 가진 컴포저블 인스턴스가 다시 생성되는 것을 볼 수 있습니다.
기존 "가", "나", "다" 에 대해 recompose 가 호출되고
상태가 "라", "가", "나" 로 변경 되었습니다.

이러한 동작은 개발자는 첫 번째 컴포저블이 생성되기를 기대하지만 기대와 다르게 동작합니다.  
이를 해결하기 위해서는 key 를 이용해서 추가적인 정보를 알려줘야합니다.

```kotlin
test.forEach { text ->
    key(text) {
        NumberText(text = text)
    }
}
```

    Initial composition with text: 가
    Initial composition with text: 나
    Initial composition with text: 다
    Click Me
    Initial composition with text: 라


이렇게 key 를 이용해서 컴포저블 인스턴스에 호츨 사이트 외에 추가적인 식별자(id) 를 주게되면 기대한 바와같이 추가된 "라" 에 대해서만 컴포저블 인스턴스가 생성됩니다.

직접 한번 돌려보면서 이해해 보기를 바랍니다.

## 마치며

위에 제시된 for 루프와 key() 컴포저블의 사용 예시는 '컴포저블 인스턴스 식별' 메커니즘을 명확히 설명하기 위한 목적입니다.  
실제 대규모 리스트 UI를 개발할 때는 성능이 최적화된 **LazyColumn**이나 **LazyRow**를 사용해야 합니다.  
Lazy Composable 역시 내부적으로 동일한 key 메커니즘을 활용하여 인스턴스를 효율적으로 관리하므로,  
이 원리를 이해하여 Lazy List의 성능 최적화 방법을 이해하는데 도움이 되기를 바랍니다.