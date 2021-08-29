# Usage

## Basic usage

**Scss:**

1. Number as parameter

```scss
$DEFAULT_MEDIA_FEATURE: "min-width" !default;
```

```scss
@media #{q(768px)} {
  .debug {
    color: red;
  }
}
```

2. String as parameter

```scss
@media #{q("min-width: 768px")} {
  .debug {
    color: red;
  }
}
```

3. Two parameters

```scss
@media #{q("min-width" 768px)} {
  .debug {
    color: red;
  }
}
```

4. Short expression (comparison operator and number)

```scss
$DEFAULT_RANGE_MEDIA_FEATURE: "width" !default;
```

```scss
@media #{q(">=" 768px)} {
  .debug {
    color: red;
  }
}
```

or

```scss
@media #{q(768px ">=")} {
  .debug {
    color: red;
  }
}
```

5. Expression (media feature, comparison operator and number)

```scss
@media #{q(width ">=" 768px)} {
  .debug {
    color: red;
  }
}
```

6. Predefined expressions

```scss
$PREDEFINED_EXPRESSIONS: (
  sm: 768px,
);

@media #{q(sm)} {
  .debug {
    color: red;
  }
}
```

**Will produce following css:**

```css
@media (min-width: 768px) {
  .debug {
    color: red;
  }
}
```

## Comparison operators

Available operators:

```scss
$LT_OP: "<", "lt";
$GT_OP: ">", "gt";
$GE_OP: ">=", "ge";
$LE_OP: "<=", "le";
$EQ_OP: "==", "eq";
```

**Only px allowed with comparison operators!!!**

1.

Next scss:

```scss
@media #{q(width lt 768px)} {
  // or #{q(width "<" 768px)}
  .debug {
    color: red;
  }
}
```

Will produce:

```css
@media (max-width: 767px) {
  .debug {
    color: red;
  }
}
```

2.

Next scss:

```scss
@media #{q(width gt 768px)} {
  // or #{q(width ">" 768px)}
  .debug {
    color: red;
  }
}
```

Will produce:

```css
@media (min-width: 769px) {
  .debug {
    color: red;
  }
}
```

## Px to em

Default config:

```scss
$CONVERT_PX_TO_EM: false !default;
```

Next scss:

```scss
$CONVERT_PX_TO_EM: true;

@media #{q(width ge 768px)} {
  // or #{q(width ">=" 768px)}
  .debug {
    color: red;
  }
}
```

Will produce:

```css
@media (min-width: 48em) {
  .debug {
    color: red;
  }
}
```
