---
title: Import
---

After installing the package, import or require the package:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
groupId="module-type"
defaultValue="es6"
values={[
{label: 'ES6', value: 'es6'},
{label: 'CommonJS', value: 'cjs'},
]}>
<TabItem value="es6">

```ts
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
```

</TabItem>
<TabItem value="cjs">

```ts
const useDropdownMenu = require('react-accessible-dropdown-menu-hook');
```

</TabItem>
</Tabs>