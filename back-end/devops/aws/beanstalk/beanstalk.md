# 빈즈 토크 활용기

> 어플리케이션을 배포할때 고려해야 하는 용량 프로비저닝, 로드 밸런싱, 모니터링들을 직접 구축하여 시간을 낭비하기 보다는 
> 빈즈토크를 이용해 어플리케이션을 업로드, 버전관리 할 수있는 기능을 가진 빈즈 토크를 사용해 보기로함.



## 애플리케이션

Elastic Beanstalk *애플리케이션*은 *환경*, *버전* 및 *환경 구성*을 포함한 Elastic Beanstalk 구성 요소의 논리적 컬렉션입니다. Elastic Beanstalk에서 애플리케이션은 개념적으로 폴더와 유사합니다.

---

## 애플리케이션 버전

Elastic Beanstalk에서 *애플리케이션 버전*은 웹 애플리케이션의 배포 가능한 코드의 레이블 지정된 특정 반복을 나타냅니다. 애플리케이션 버전은 Java WAR 파일 등의 배포 가능한 코드가 포함된 Amazon Simple Storage Service(Amazon S3) 객체를 가리킵니다.

---

## 환경

*환경*은 애플리케이션 버전을 실행 중인 AWS 리소스 모음입니다. 각 환경은 한 번에 하나의 애플리케이션 버전만 실행하지만 여러 환경에서 동일한 애플리케이션 버전 또는 서로 다른 애플리케이션 버전을 동시에 실행할 수 있습니다.

---

## 환경 티어

Elastic Beanstalk 환경을 시작할 때 먼저 환경 티어를 선택합니다. 환경 티어는 환경에서 실행하는 애플리케이션 유형을 지정하고 Elastic Beanstalk에서 이러한 애플리케이션을 지원하기 위해 프로비저닝하는 리소스를 결정합니다.

---

## 환경 구성

*환경 구성*은 환경 및 연관된 리소스의 작동 방법을 정의하는 파라미터 및 설정의 모음을 식별합니다. 환경의 구성 설정을 업데이트하면 Elastic Beanstalk가 자동으로 기존 리소스에 변경 사항을 적용하거나, 삭제하고 새 리소스를 배포합니다.

---

## 저장된 구성

*저장된 구성*은 고유한 환경 구성을 생성하기 위한 시작점으로 사용할 수 있는 템플릿입니다. Elastic Beanstalk 콘솔, EB CLI, AWS CLI 또는 API를 사용하여 저장된 구성을 생성 및 수정하고 환경에 적용할 수 있습니다. API 및 AWS CLI는 저장된 구성을 *구성 템플릿*으로 참조합니다.

---

## 플랫폼

*플랫폼*은 운영 체제(OS), 프로그래밍 언어 런타임, 웹 서버, 애플리케이션 서버 및 Elastic Beanstalk 구성 요소의 조합입니다. 웹 애플리케이션을 설계하고 플랫폼에 맞게 타겟팅합니다. Elastic Beanstalk는 애플리케이션을 구축할 수 있는 플랫폼을 다양하게 지원합니다.



## CLI 사용법

> EB의 경우 배포 생성 등을 CLI 를 이용해서 진행하기 때문에 CLI를 설치 해줘야한다



### EB 활성화

```she
eb init
```

![image-20230103182728306](/Users/user/git/til/back-end/devops/aws/beanstalk/image-20230103182728306.png)

1. AWS Region 선택: 10번 (서울)

![image-20230103183403315](/Users/user/git/til/back-end/devops/aws/beanstalk/image-20230103183403315.png)

2. EB Application에 사용될 이름 선택 (application-admin)
3. Docker 사용여부를 묻는 질문 (Y)
4. Docker만을 이용해서 서비스 할지, ECS를 구성해서 사용할지 선택 (1번)

![image-20230103183702117](/Users/user/git/til/back-end/devops/aws/beanstalk/image-20230103183702117.png)

5. CodeCommit 사용여부 (N)
6. SSH설정 여부와 Key 선택 (bems-keys 선택)



설정완료후 `.elasticbeanstalk/config.yml`

```yaml
branch-defaults:
  main:
    environment: null
    group_suffix: null
global:
  application_name: application-admin
  branch: null
  default_ec2_keyname: bems-keys
  default_platform: Docker running on 64bit Amazon Linux 2
  default_region: ap-northeast-2
  include_git_submodules: true
  instance_profile: null
  platform_name: null
  platform_version: null
  profile: eb-cli
  repository: null
  sc: git
  workspace_type: Application
```



## EB 생성

```shell
eb create [application-name]
```

![image-20230103184524748](/Users/user/git/til/back-end/devops/aws/beanstalk/image-20230103184524748.png)

* EB로 어플리케이션 구성 완료

![image-20230103193201066](/Users/user/git/til/back-end/devops/aws/beanstalk/image-20230103193201066.png)