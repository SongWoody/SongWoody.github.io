---
title: 마크다운(Markdown) 작성 문법 정리
date: "2025-04-17T21:27:03.284Z"
description: "마크다운(Markdown)의 여러 기호 등에 익숙해 질수 있게 간단한 사용법을 설명하겠습니다."
categories: ["기타", "마크다운"]
tags: ["Markdown", "마크다운"]
---

- 개발을 하거나 문서를 정리하다 보면 마주치는 Markdown.  
- Markdown 은 단순한 텍스트가 아니라, #, *, - 등 여러 기호를 사용하여 문서를 간단하게 작성하고 읽기 편하게 만들 수 있습니다.
- 처음엔 낯설지만, 알고 보면 굉장히 간단하고 유용한 문법입니다.    
- 여러 기호 등에 익숙해 질수 있게 간단한 사용법을 설명하겠습니다.

#### Markdown 기본 문법

##### 1. 코드 블록  

작성:

    ```js
    const saltyDuckEgg = "chinese preserved food product"
    ```
출력:

```js
const saltyDuckEgg = "chinese preserved food product"
```

##### 2. 표 생성

작성:

    | Number | Title                                    | Year |
    | :----- | :--------------------------------------- | ---: |
    | 1      | Harry Potter and the Philosopher’s Stone | 2001 |
    | 2      | Harry Potter and the Chamber of Secrets  | 2002 |
    | 3      | Harry Potter and the Prisoner of Azkaban | 2004 |

출력:

| Number | Title                                    | Year |
| :----- | :--------------------------------------- | ---: |
| 1      | Harry Potter and the Philosopher’s Stone | 2001 |
| 2      | Harry Potter and the Chamber of Secrets  | 2002 |
| 3      | Harry Potter and the Prisoner of Azkaban | 2004 |


##### 3. 헤더 사용법

    # Header 1
    ## Header 2
    ### Header 3
    #### Header 4
    ##### Header 5
    ###### Header 6

# Header 1
## Header 2
### Header 3 
#### Header 4
##### Header 5
###### Header 6



##### 3. 글자 기울임

    > 기울어진 글자
> 기울어진 글자


    > ## 헤더 기울이기
    > 1. 리스트도 
    > 2. 길울일 수 있습니다.
    >
    > 일반 텍스트
    >
    >     탭 한번

> ## 헤더 기울이기
> 1. 리스트도 
> 2. 길울일 수 있습니다.
>
> 일반 텍스트
>
>     탭 한번

##### 4. 글자 강조

    - `양쪽에 백틱을 넣어서 감싸면` 코드 강조를 할 수 있습니다.
    - **양쪽에 별을 넣으면** 굵게 표시할 수 있습니다.
    - _양쪽에 언더바는_ 기울어져서 나옵니다. 

- `양쪽에 백틱을 넣어서 감싸서` 강조 할 수 있습니다.
- **양쪽에 별을 넣으면** 굵게 표시할 수 있습니다.
- _양쪽에 언더바는_ 기울어져서 나옵니다. 

##### 5. 번호 매기기

    1. 첫 번째
    2. 두 번째
    3. 세 번째

1. 첫 번째
2. 두 번째
3. 세 번째


##### 6. 구분선

`* * *` 는
-    * * *
`***` 는
-    ***
`*****` 는
-    *****
`- - -` 는
-    - - -
`---` 는
-    ---
`---------------------------------------` 는
-    ---------------------------------------


##### 7. 링크

`[링크](http://example.com "Example")` 는 이렇게 사용합니다.

[링크](http://example.com "Example") 는 이렇게 사용합니다.



* * *

##### 마무리

- Markdown은 간단하면서도 강력한 문법을 제공하여 문서를 더욱 쉽게 작성할 수 있도록 도와줍니다.
- GitHub의 README 파일뿐만 아니라, 블로그, 기술 문서, 협업 문서 등 다양한 곳에서 활용할 수 있으니, 
- 자주 사용하면서 익숙해지면 여러 곳에서 유용하게 사용할 수 있습니다. 😀