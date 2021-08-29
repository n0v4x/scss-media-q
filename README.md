# Usage

## Basic usage

**Scss:**

1. Number as parameter

Default config variable that helps define, which media feature will be used if number passed as parameter:

```scss
$DEFAULT_MEDIA_FEATURE: "min-width" !default;
```

scss:

```scss
@media #{q(768px)} {
  .debug {
    color: red;
  }
}
```

2. String as parameter

scss:

```scss
@media #{q("min-width: 768px")} {
  .debug {
    color: red;
  }
}
```

3. Two parameters

scss:

```scss
@media #{q("min-width" 768px)} {
  .debug {
    color: red;
  }
}
```

4. Short expression (comparison operator and number)

Default config variable that helps define which range media feature will be used if short expression passed as parameter:

```scss
$DEFAULT_RANGE_MEDIA_FEATURE: "width" !default;
```

scss:

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

scss:

```scss
@media #{q(width ">=" 768px)} {
  .debug {
    color: red;
  }
}
```

6. Predefined expressions

scss:

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

1. Less than operator

Next scss:

```scss
@media #{q(width lt 768px)} {
  // or #{q(width "<" 768px)}
  .debug {
    color: red;
  }
}
```

Will produce following css:

```css
@media (max-width: 767px) {
  .debug {
    color: red;
  }
}
```

2. Greater than operator

Next scss:

```scss
@media #{q(width gt 768px)} {
  // or #{q(width ">" 768px)}
  .debug {
    color: red;
  }
}
```

Will produce following css:

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

Will produce following css:

```css
@media (min-width: 48em) {
  .debug {
    color: red;
  }
}
```
