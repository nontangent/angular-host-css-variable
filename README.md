# Angular Host CSS Variable
This package enable to use host-scoped css variable by `hvar(--name)` in Angular.

## DEMO
[Stackblitz Demo](https://stackblitz.com/edit/angular-host-css-variable-demo?file=src/app/app.component.scss)

## Support
Angular 11++

## Install
```
$ ng add angular-host-css-variable
```

## Usage Example
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

App Component => Parent Component => Child Component


2. Edit each component scss 

`child.component.scss`

```child.component.scss
@import "~host-css-variable/host-variable";
$host: host("child");

:host {
  @include hvar(--width, 100%);
  @include hvar(--height, 100%);
  @include hvar(--side-padding, 8px);
}

:host {
  display: block;
  width: calc(hvar(--width) - hvar(--side-padding) * 2);
  height: hvar(--height);
  padding: 0 hvar(--side-padding);

  outline: skyblue solid 1px;

  div {
    width: calc(hvar(--width) - hvar(--side-padding) * 2);
    height: calc(hvar(--height) - 32px);
    outline: skyblue solid 1px;
  }
}

```


`parent.component.scss`

```parent.component.scss
@import "~host-css-variable/host-variable";
$host: host("parent");

:host {
  @include hvar(--width, 100%);
  @include hvar(--height, 100vh);
  @include hvar(--side-padding, 16px);
}

:host {
  display: block;
  width: calc(hvar(--width) - hvar(--side-padding) * 2);
  height: hvar(--height);
  padding: 0 hvar(--side-padding);
  outline: skyblue solid 1px;

  app-child {
    --width: calc(hvar(--width) - hvar(--side-padding) * 2);
    --height: calc(hvar(--height) - 32px);
    --side-padding: 16px;
  }
}
```

`app.component.scss`

```app.component.scss
@import "~host-css-variable/host-variable";
$host: host("app");

:host {
  @include hvar(--width, 100vw);
  @include hvar(--height, 100vh);
}

:host {
  display: block;
  width: hvar(--width);
  outline: skyblue solid 1px;

  app-parent {
    --width: hvar(--width);
    --height: calc(hvar(--height) - 32px);
    --side-padding: 32px;
  }
}
```

In this case, each component's --side-padding is following.

|  components  |  --side-width(overrited) | --side-width(default) |
|  :----       |  ----:                   |  ----:                |
|  parent      | 32px                     | 16px                  |
|  child       |  16px                    | 8px                   |


If you want to know more detail, access to [Stackblitz Demo](https://stackblitz.com/edit/angular-host-css-variable-demo?file=src/app/app.component.scss).