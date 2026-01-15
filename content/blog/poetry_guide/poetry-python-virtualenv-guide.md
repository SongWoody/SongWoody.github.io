---
title: Poetry 사용법 정리 - python 가상환경 관리
date: "2025-05-12T22:30:00.284Z"
description: "python 가상환경 관리 툴인 Poetry 사용법을 정리합니다."
categories: ["Python"]
tags: ["Python", "가상환경"]
slug: "poetry-python-virtualenv-guide/"
---

최근 SAM(Segment-Anything-Model)을 활용해 이미지 처리 데스크톱 앱을 만들 일이 생겨,  
Python 개발 환경을 구성하려던 중, **Poetry**라는 도구를 알게 되었습니다.  
그동안 Conda 를 주로 사용해왔고, 간단한 분석용 스크립트나 실험 환경을 구성할 때 꽤 유용하게 느껴졌습니다.  
하지만 이번에는 실제 배포가 가능한 데스크톱 앱을 만들어야 했기 때문에,  
 **의존성 관리, 버전 고정, 패키징**에 강점과 **협업 이점**까지 있는 Petry 를 사용하게 되어 간단한 사용법을 공유합니다.

 >기본적인 사용법과 가상환경 생성, Jupyter 커널 생성까지만 다루고 패키징은 따로 다루지 않습니다.

## ✅ 1. Python 설치 확인
 Poetry는 Python 기반으로 동작하므로 Python이 반드시 설치되어 있어야 합니다. 아래 명령어로 설치 여부를 확인하세요.
 ```shell
 python --version
 ```
 설치되어 있지 않다면 [Python 공식 사이트](https://www.python.org/downloads/)에서 설치하세요. **설치 시 "Add Python to PATH" 옵션을 반드시 체크**해야 합니다.


## ✅ 2. Poetry 설치
 PowerShell에서 아래 명령어를 실행하세요.
 ```shell
 WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | python -
 ```
 설치 경로는 일반적으로 다음과 같습니다.
 ```shell
 C:\Users\{사용자명}\AppData\Roaming\Python\Scripts
 ```
 해당 경로를 사용자 환경 변수 또는 시스템 환경 변수에 추가해야 `poetry` 명령어가 정상적으로 인식됩니다.  
설치 확인:  
```shell
poetry --version
```


## ✅ 3. 프로젝트 생성

### 새로운 프로젝트 생성
```shell
poetry new myproject
cd myproject
```

### 기존 프로젝트에 Poetry 적용
해당 프로젝트 폴더로 이동 -> 명령어 입력
```shell
poetry init
```

기본적으로 아래와 같은 프로젝트 구조가 생성됩니다.
```shell
myproject/
├── pyproject.toml
├── src/
│   └── myproject/
│        └── __init__.py
└── tests/
    └── __init__.py
```

## ✅ 4. 가상환경 생성 및 진입
Poetry는 자체적으로 `.venv` 폴더를 생성해 가상환경을 관리합니다. **2.0 버전 이상**에서는 쉘 기능이 플러그인으로 분리되었으므로 아래 명령으로 추가하세요.
```shell
poetry self add poetry-plugin-shell
```

가상환경 생성 및 진입:
```shell
poetry install
poetry shell
```
특정 Python 버전을 사용할 경우:
```shell
poetry env use python3.12
```
Windows에서는 Python 경로를 직접 지정:
```shell
poetry env use C:\Users\{사용자명}\AppData\Local\Programs\Python\Python312\pythonw.exe
```

## ✅ 5. 패키지 및 라이브러리 추가

패키지 추가:
```shell
poetry add numpy
```

버전을 고정해서 설치:
```shell
poetry add numpy@1.26.4
```

개발용 패키지 추가:
```shell
poetry add --dev 패키지명
```
추가 시 `pyproject.toml` 파일의 `tool.poetry.dependencies` 섹션에 자동으로 등록됩니다.

## ✅ 6. 가상환경 종료
```shell
exit
```

## ✅ 7. Python 버전 변경 시 lock 파일 재생성
pyproject.toml에서 Python 버전을 수정한 후 poetry install을 실행하면 버전 불일치 오류가 발생할 수 있습니다. 이 경우 다음 명령어로 해결합니다.
```shell
poetry lock
poetry install
```
---
# 💻 Jupyter Notebook에서 Poetry 가상환경 사용하기

## ✅ 1. Jupyter Notebook 설치
```shell
poetry add jupyter ipykernel
poetry add --dev notebook ipykernel
```
Jupyter Lab을 설치할 경우:
```shell
poetry add --dev jupyterlab ipykernel
```

## ✅ 2. 가상환경을 Jupyter 커널로 추가
```shell
poetry run python -m ipykernel install --user --name MyApp-py312 --display-name "MyApp (Python 3.12)"
```
- --name : 가상환경 이름  
- --display-name : Jupyter에서 표시될 이름

## ✅ 3. Jupyter Notebook 실행
```shell
poetry run jupyter notebook
```
웹 브라우저에서 Jupyter Notebook이 열립니다.

## ✅ 4. Jupyter Notebook 커널 변경
Notebook 내에서 **Kernel > Change kernel** 메뉴에서 방금 추가한 "MyApp (Python 3.12)"를 선택합니다.

## ✅ 추가 - Jupyter 커널 삭제
설치된 커널 목록 확인:
```shell
jupyter kernelspec list
```
원하는 커널 삭제:
```shell
jupyter kernelspec uninstall MyApp-py312
```
---
# 🎉 마무리

Poetry의 고급 기능을 잘 활용하면 패키지 충돌 최소화, 가상환경 관리 효율 향상, 협업 시 일관성 유지 등 실무에서 다양한 이점을 얻을 수 있습니다.

추가로 poetry config를 통해 글로벌 설정도 변경 가능하니 상황에 맞게 커스터마이징할 수 있습니다.