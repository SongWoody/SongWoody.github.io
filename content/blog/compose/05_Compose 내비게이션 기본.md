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
TBD
```