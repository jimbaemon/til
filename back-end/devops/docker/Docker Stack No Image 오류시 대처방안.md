# Docker Stack : Service No Image 오류시 대처방안

> [참조 링크](https://docs.docker.com/engine/reference/commandline/stack_deploy/)

* Docker stack apply시 Service 가 안올라가고 `Docker service ps [servicename]`  에러에서 No Image 오류 발생시 Image 가 Registry 에 존재하지 않거나 Local Registry 를 바라보고 있지 않아서 발생할수 있다. 이럴때는 `--with-registry-auth` Option을 추가해주면 된다.

```bash
$docker stack deploy --with-registry-auth -c [copose.yml] backend
```

