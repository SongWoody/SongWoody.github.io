---
title: Markdown 사용법
date: "2025-03-12T21:27:03.284Z"
description: "First Post"
---

개발자면 git Rrepository 를 만들다보면 README.md 파일을 많이 접해봤을 겁니다.
이 파일은 단순한 텍스트가 아니라, 프로젝트의 소개, 사용 방법, 개발 환경 등을 문서화하는 중요한 역할을 합니다. 그런데 이 README.md 파일은 단순한 TXT 파일이 아니라 Markdown이라는 문법을 사용해 작성됩니다.

# Markdown 이란?

Markdown은 2004년 John Gruber와 Aaron Swartz에 의해 개발된 가벼운 마크업 언어입니다. 간단한 문법을 사용하여 가독성이 높고, HTML로 변환하기 쉬운 문서를 작성할 수 있습니다. 특히 개발자 커뮤니티에서는 README 파일뿐만 아니라, 블로그, 기술 문서, 위키 등 다양한 곳에서 널리 사용되고 있습니다.

# Markdown 기본 문법

코드 블록
```js
const saltyDuckEgg = "chinese preserved food product"
```

표 생성
| Number | Title                                    | Year |
| :----- | :--------------------------------------- | ---: |
| 1      | Harry Potter and the Philosopher’s Stone | 2001 |
| 2      | Harry Potter and the Chamber of Secrets  | 2002 |
| 3      | Harry Potter and the Prisoner of Azkaban | 2004 |

    | Number | Title                                    | Year |
    | :----- | :--------------------------------------- | ---: |
    | 1      | Harry Potter and the Philosopher’s Stone | 2001 |
    | 2      | Harry Potter and the Chamber of Secrets  | 2002 |
    | 3      | Harry Potter and the Prisoner of Azkaban | 2004 |

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


> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    > Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> ## This is a header.
>
> 1. This is the first list item.
> 2. This is the second list item.
>
> Here's some example code:
>
>     Markdown.generate();

    > ## This is a header.
    > 1. This is the first list item.
    > 2. This is the second list item.
    >
    > Here's some example code:
    >
    >     Markdown.generate();


- `code goes` here in this line
- **bold** goes here

```markdown
- `code goes` here in this line
- **bold** goes here
```

1. 첫 번째
2. 두 번째
3. 세 번째

```markdown
1. 첫 번째
2. 두 번째
3. 세 번째
```

* * *

***

*****

- - -

---

---------------------------------------

    * * *

    ***

    *****

    - - -

    ---

    ---------------------------------------

이것은 [링크](http://example.com "Example") 이다.


[id]: http://example.com "Optional Title"

    This is [an example](http://example.com "Example") link.

    [This link](http://example.com) has no title attr.

    This is [an example] [id] reference-style link.

    [id]: http://example.com "Optional Title"

*single asterisks*

_single underscores_

**double asterisks**

__double underscores__

    *single asterisks*

    _single underscores_

    **double asterisks**

    __double underscores__


마무리

Markdown은 간단하면서도 강력한 문법을 제공하여 문서를 더욱 쉽게 작성할 수 있도록 도와줍니다. GitHub의 README 파일뿐만 아니라, 블로그, 기술 문서, 협업 문서 등 다양한 곳에서 활용할 수 있으니, 자주 사용하면서 익숙해지면 여러 곳에서 유용하게 사용할 수 있습니다. 😀