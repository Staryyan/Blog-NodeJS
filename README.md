# Blog
## 简介
本博客服务器端使用NodeJs，客户端使用AngularJs+Jquery， Ui框架使用Bootstrap，数据库使用MongoDB。

## 使用说明

```
./initScript
```

然后访问 [Stary's blog](http://localhost:3000/views/home.html)

## 功能介绍
### 1、guest模式
用户不需要登录就可以直接查看博客，但不可以评论，不可以写博客。

### 2、User模式
用户需要进行简易注册（用户名为primary key），用户可以进行写博客，评论，删除自己的博客，删除自己的评论，修改自己的评论。

### 3、Administration模式
管理员拥有最高权限，可以删除所有人的博客，删除或隐藏用户评论，可以发布公告。
账号为: Administration
密码为: 123456

## 特色介绍
### 1、博客部分
1. 可以保留草稿，删除草稿。
2. 可以使用定义好的HTML标签写博客。

### 2、用户部分
1. 可以根据文章名搜索。
2. 分页功能。
