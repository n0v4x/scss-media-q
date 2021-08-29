# Usage

## 1. Number as parameter

**scss:**

```scss
@media #{q(768px)} {
  .debug {
    color: red;
  }
}
```

**css:**

```css
@media (min-width: 768px) {
  .debug {
    color: red;
  }
}
```
