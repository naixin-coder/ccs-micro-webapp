

## 遇到的问题

packages中的组件代码更新后，apps中umi无法及时更新代码，将umi配置中的mfsu关闭

packages中的tsconfig.json即使配置paths属性，但是导出了后在apps中引入会报错，所以packages中不能使用paths中的别名来引用


## qiankun的坑

1. 子应用同时使用umi时，pro中的provider会报错
