---
title: Parcelize Parcelable 을 편하게 사용하기
date: "2025-11-24T11:12:12.284Z"
description: "Parcelize 플러그인을 사용하여 Parcelable 구현을 자동으로하는 방법을 소개합니다."
categories: ["안드로이드"]
tags: ["android", "parcelize", "parcelable"]
---

# Parcelize

`parcelize` 플러그인을 사용하면 Parcelable 의 구현에 필요한 코드(보일러플레이트) 없이 `@Pacelaze` 어노테이션을 추가해 편하게 사용할 수 있습니다.  
Pacelable 은 런타임에 동작하는 라이브러리가 아니라, **컴파일 시점(Compile Time)** 에 코드를 변환하므로 리플렉션을 사용하는 Serializable 처럼 런타임 오버헤드가 없습니다.  
단, 이를 가능하게 하려면 직렬화 시켜주는 코드를 개발자가 직접 작성해야 하는 불편함이 따라왔습니다.  
이를 해결하기 위해 `parcelize` 가 등장하였고, 이 플러그인은 바이트코드로 변환하는 과정에 개입하여 Parcelable 구현에 필요한 코드를 직접 생성해 줍니다.

이 포스트는 `@Parcelize` 의 간단한 사용방법과, `@TypeParceler` 를 사용하여 개발자가 직접 작성하지 않은 외부 Class 를 직렬화하는 방법을 설명하겠습니다.


# 프로젝트 설정

```
// gradle(:app)
plugins { 
    id("kotlin-parcelize")
}
```
or  

```
// version catalog

// libs.versions.toml
[plugins]
kotlin-parcelize = { id = "org.jetbrains.kotlin.plugin.parcelize" }

// gradle(:app) 
plugins {
    alias(libs.plugins.kotlin.parcelize)
}
```

# 기본 사용법

```kotlin
import kotlinx.parcelize.Parcelize

@Parcelize
class User(val firstName: String, val lastName: String, val age: Int): Parcelable
```

# 지원 타입

- Primitive Types (and their boxed versions)
    - Int, Boolean, Long 등 (java.lang.Integer, java.lang.Boolean 등)
- Objects 과 enums
- String, CharSequence
- Exception
- Size, SizeF, Bundle, IBinder, IInterface, FileDescriptor
- SparseArray, SparseIntArray, SparseLongArray, SparseBooleanArray
- 모든 Serializable (Date 포함), Parcelable 구현체
- 지원 되는 모든 타입에 대한 Collections: 
    - List (내부적으로 ArrayList 로 처리하여 직렬화), 
    - Set (내부적으로 LinkedHashSet 으로 처리하여 직렬화), 
    - Map (내부적으로 LinkedHashMap 으로 처리하여 직렬화)
- 지원 되는 모든 타입에 대한 Arrays
- 지원 되는 모든 타입에 대한 Nullable (Int?, List<String>?)

# Custom Parcele

Custom Parcele 은 `Pacelable` 인터페이스를 구현할 수 없는 타입을 Parcelable 객체에 포함시켜야할 때 사용됩니다.

**Custom Parceler 사용 케이스**
- **외부/표준 라이브러리 타입 직렬화**: 개발자가 수정할 수 없는 클레스(java.util.UUID 등)
- **커스텀 로직 사용**: 객체의 내부 상태를 그대로 직렬화하는 대신, 특정 필드만 직렬화하거나, 직렬화 과정에서 데이터를 압축 또는 변환하는 등의 커스텀 로직이 필요할 때

**Parceler 사용법**  
Custom Parceler는 `kotlinx.parcelize.Parceler<T>` 인터페이스를 구현하여 정의합니다. 여기서 T는 직렬화하려는 타입입니다.  

**Parceler 인터페이스 정의**  
- **create(parcel: Parcel)**: T (역직렬화, 읽기): Parcel에서 데이터를 읽어와 객체 T의 인스턴스를 생성하고 반환합니다.  
- **write(input: T, parcel: Parcel, flags: Int) (직렬화, 쓰기)**: 객체 T의 인스턴스(input)를 Parcel에 기록합니다.

직렬화가 필요한 외부 데이터 예시:

```kotlin
// 외부 데이터
data class ExternalData(
    val data1: String,
    val data2: String
)

// Parceler 인터페이스 구현
object ExternalParceler : Parceler<ExternalData> {
    // 1. [쓰기 / 직렬화]: ExternalData 객체를 Parcel에 기록
    override fun ExternalData.write(
        parcel: Parcel,
        flags: Int,
    ) {
        // data1을 기록
        parcel.writeString(this.data1)
        // data2를 기록 (순서 중요!)
        parcel.writeString(this.data2)
    }

    // 2. [읽기 / 역직렬화]: Parcel에서 데이터를 읽어 ExternalData 객체 생성
    override fun create(parcel: Parcel): ExternalData {
        // 쓴 순서와 정확히 일치하게 읽어야 합니다.
        val data1 = parcel.readString() ?: ""
        val data2 = parcel.readString() ?: ""
        return ExternalData(data1, data2)
    }
}
``` 

`@TypeParceler` 또는 `@WriteWith` 사용하여 Parcelable 클래스에 외부 클래스 추가

```kotlin 
// @TypeParceler 을 Class에 적용
@Parcelize
@TypeParceler<ExternalData, ExternalParceler>
data class User(
    val name: String,
    val data: ExternalData,
): Parcelable

// @TypeParceler 을 프로퍼티에 적용
@Parcelize
data class User(
    val name: String,
    @TypeParceler<ExternalData, ExternalParceler>
    val data: ExternalData,
): Parcelable


// @WriteWith 을 사용하여 파라미터에 적용
@Parcelize
data class User(
    val name: String,
    val data: @WriteWith<ExternalParceler> ExternalData,
): Parcelable

//

```


# @IgnoredOnParcel: 직렬화가 필요없는 프로퍼티 무시

@IgnoredOnParcel 은 Parcelable 객체 내의 특정 프로퍼티를 직렬화 및 역질렬화 과정에서 제외하고 싶을 때 사용합니다.  
보통 클래스 필드, 위임(by) 나 Callback 같은 경우 Warning 으로 표시해 줍니다.

사용 케이스 
- **계산된 값일 경우**: 클래스의 다른 필드를 기반으로 런타임에 계산되는 프로퍼티인 경우 (firname+lastname = fullname)
- **일시적인 상태**: 유지될 필요가 없는 임시 상태(예: UI 상태, 캐시된 값 등)
- **직렬화 불가능 객체**: Parceler로도 처리할 수 없는 복잡한 객체나 **메모리 참조(예: 콜백 리스너, Context 등)** 를 포함해야 할 때 사용

```kotlin
@Parcelize
data class User(
    val firstName: String,
    val lastName: String,
    @IgnoredOnParcel
    var ignoredValue: String? = null // 직렬화 제외가 필요한 값 제외
) : Parcelable {
    
    // (IgnoredOnParcel 을 사용하지 않아도 제외 됨)
    // 계산된 값: 런타임에 계산되므로 Parcel에 기록할 필요가 없습니다.
    @IgnoredOnParcel
    val fullName: String = "$firstName $lastName"
    
    // (IgnoredOnParcel 을 사용하지 않아도 제외 됨)
    // 임시 상태 / 직렬화 불가 객체
    // @IgnoredOnParcel 어노테이션을 사용하여 이 필드를 Parcelable 로직에서 제외합니다.
    @delegate:IgnoredOnParcel // 프로퍼티 위임 시 사용
    val tempCache: Map<String, Any> by lazy { 
        // 무거운 초기화 로직...
        mutableMapOf()
    }

    // (IgnoredOnParcel 을 사용하지 않아도 제외 됨)
    // 콜백 리스너: 보통 Parcelable로 전달할 수 없으므로 무시합니다.
    @IgnoredOnParcel
    var listener: (() -> Unit)? = null
}
```


# 마무리 

더 자세한 내용을 알고 싶으면 [공식 문서](https://developer.android.com/kotlin/parcelize) 참고하시면 됩니다.