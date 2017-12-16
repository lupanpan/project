/**
 * Created by Mtime on 2017/9/21.
 */

/*response.redirect方法,允许网址的重定向*/
response.redirect("/hello/anime");
response.redirect("http://www.example.com");
response.redirect(301, "http://www.example.com");

/*response.sendFile方法，用于发送文件*/
response.sendFile("/path/to/anime.mp4");

/*response.render方法，用户渲染网页模板*/
app.get("/", function (request, response) {
   response.render("index", { message: "Hello World" });
});
/*上面代码使用render方法，将message变量传入index模板，渲染成HTML网页。*/
