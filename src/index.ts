



import express, { Request, Response } from "express";

const app = express();

app.get("/*", (request: Request, response: Response) => {
  const url = request.params?.[0]
  response.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <!-- Avoid GET request to favicon.ico -->
  <link rel="icon" href="data:;base64,iVBORw0KGgo=">
  <title>Clickjacking test</title>
</head>
<body>
  <input type="text" id="iframeUrl" placeholder="Iframe Url"> 
  <p>If you see the iframe displaying content, this means you can hijack users to click into it by adding an opacity 0 iframe on top a link or a button.</p>
  <p>When the user clicks the button, is instead clicking the invisible iframe that is on top. You can force the user to make sensitive actions</p> 
  <iframe id="ifr" src="${url}">Iframe is not supported in your browser</iframe>   
  <p>I see the iframe, now what?<br/>
  Go ahead and try to find any sensitive action on the iframe, if you do, report it to the owners of the domain</p>
  
  <script>
    const inp = document.querySelector("#iframeUrl");
    const ifr = document.querySelector("#ifr"); 

    inp.addEventListener("change", () => {
      ifr.src = inp.value;
    });
  </script>
</body>
</html>`);
});

app.listen(1337, () => {
  console.log("Open http://127.0.0.1:1337/your_url in your browser");
});
