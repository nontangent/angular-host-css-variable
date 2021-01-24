# Angular Host CSS Variable
This package enable to use host-scoped css variable by `hvar(--name)` in Angular.

## DEMO
[Stackblitz](https://stackblitz.com/edit/angular-host-css-variable-demo?file=src/app/app.component.scss)

## Support
Angular 11++

## Install
```
$ ng add angular-host-css-variable
```

## Example
1. Create components

```shell
$ ng g c components/child
CREATE src/app/components/child/child.component.scss (0 bytes)
CREATE src/app/components/child/child.component.html (20 bytes)
CREATE src/app/components/child/child.component.spec.ts (619 bytes)
CREATE src/app/components/child/child.component.ts (272 bytes)
CREATE src/app/components/child/child.Component.scss (47 bytes)
UPDATE src/app/app.module.ts (403 bytes)

$ ng g c components/parent
CREATE src/app/components/parent/parent.component.scss (0 bytes)
CREATE src/app/components/parent/parent.component.html (21 bytes)
CREATE src/app/components/parent/parent.component.spec.ts (626 bytes)
CREATE src/app/components/parent/parent.component.ts (276 bytes)
CREATE src/app/components/parent/parent.Component.scss (48 bytes)
UPDATE src/app/app.module.ts (496 bytes)

```

2. 

`parent.component.scss`

```parent.component.scss
:host {
  
}
```

