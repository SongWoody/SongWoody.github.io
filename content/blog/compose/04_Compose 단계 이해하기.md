---
title: ComposeStudy - 04.컴포즈 단계 이해하기 
date: "2025-11-17T22:11:50.1557"
description: "제트팩 컴포즈의 단계(컴포지션-레이아웃-그리기) 에 대해 정리합니다."
categories: ["안드로이드", "컴포즈"]
tags: ["android", "jetpack compose", "컴포즈 단계"]
---


# Jetpack Compose 단계

사용자한테 시각적인 UI가 보일 때까지 Jetpack Compose 는 3개의 주요 단계를 거치게 됩니다.  
이는  
컴포즈가 컴포저블 함수를 실행해서 UI 트리를 만드는 **컴포지션** 단계,  
UI 트리를 읽고 각 노드의 크기를 ***측정*** 하고 ***배치*** 하는 단계인 **레이아웃** 단계,  
배치된 UI를 기기 화면에 그리는 단계인 **그리기(Drawing)** 단계가 있습니다.  

![compose_phases](./resources/compose_phasesl.svg)

이러단 단계는 일반적으로 순서대로 진행하여 프레임을 생성합니다.
하지만 BoxWithConstraints, LazyColumn, LazyRow은 예외로, 하위 요소의 컴포지션이 상위 요소의 레이아웃 단계에 따라 달라집니다.(이거는 나중에 분석해 보기로 합니다.)

또한 컴포즈는 성능을 최적화하기 위해서 동일 데이터(State)가 변경될 때에는 이러한 단계를 최대한 스킵한다.


# 단계 과정 이해하기

## 1. 컴포지션(Composition)

앞선 포스트 "Compose 수명주기" 에서도 여러번 설명한 **컴포지션 단계** 입니다.  
Compose 런타임이 컴포저블 함수를 실행하고 **UI 트리를 출력** 합니다.  
>(조금 자세히 찾아보니 컴포지션은 **SlotTable** 이라는 내부 구조에 UI 생성 로직과 데이터를 저장하며, 이 로직이 실행되어 **LayoutNode** 라는 실제 렌더링 및 레이아웃을 위한 UI 트리를 구성한다고 하는데... 나중에 자세히 알아보는걸로..)

![compose_ui_tree](./resources/compose_ui_tree.svg)

## 2. 레이아웃(Layout)

>ContentPending

## 3. 그리기(Drawing)

>ContentPending