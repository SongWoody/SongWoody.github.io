---
title: "Jetpack DataStore: Android 데이터 저장을 위한 최신 솔루션"
date: "2023-12-03T09:00:00.000Z"
description: "Android 앱에서 데이터를 효율적이고 안전하게 저장하는 Jetpack DataStore에 대해 알아봅니다."
category: "Android"
tags: ["Android", "Jetpack", "DataStore", "Kotlin", "Preferences", "Proto"]
---

## 왜 DataStore인가? (SharedPreferences의 한계)

오랜 시간 동안 Android에서 간단한 키-값(Key-Value) 형태의 데이터를 저장하는 데에는 `SharedPreferences`가 주로 사용되어 왔습니다. 하지만 `SharedPreferences`는 몇 가지 중대한 한계를 가지고 있습니다.

1.  **UI 스레드에서 안전하지 않음**: `apply()`는 비동기적으로 디스크에 쓰기를 하지만, `commit()`은 UI 스레드를 블로킹할 수 있습니다. `get*()` 메서드 또한 메모리에 로드된 데이터를 읽어오는 것이므로, 초기 로딩 시 디스크 I/O가 발생하여 UI 스레드를 블로킹할 위험이 있습니다. 이는 ANR(Application Not Responding)을 유발할 수 있습니다.
2.  **동기 API**: 모든 작업이 동기적으로 이루어지므로 메인 스레드에서 호출 시 성능 저하를 야기합니다.
3.  **런타임 오류 가능성**: 저장 및 조회 시 파싱 오류 등의 런타임 오류에 대한 보호 메커니즘이 부족합니다.
4.  **트랜잭션 미지원**: 여러 데이터를 한 번에 업데이트할 때, 부분적인 성공/실패가 발생할 수 있습니다.

이러한 문제점들을 해결하기 위해 Google은 Jetpack DataStore를 도입했습니다.

## Jetpack DataStore란?


1.  **Preferences DataStore**: 
2.  **Proto DataStore**: 

## Preferences DataStore 사용법

가장 먼저 접하게 될 Preferences DataStore의 기본적인 사용법을 살펴보겠습니다.

### 1. 의존성 추가

### 2. DataStore 생성

### 3. 데이터 쓰기 (저장)

### 4. 데이터 읽기 (조회)

## Proto DataStore (추후 다룰 예정)

## 결론
