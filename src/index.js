const templates = [
  {
    id: "1231234-4123123-12312312",
    type: "template",
    childs: [
      {
        id: "123123",
        type: "wrapper",
        childs: [
          { id: "123123123213", type: "input", childs: [] },
          {
            id: "123123123213",
            type: "button",
            options: {
              onClick: "open-template",
              templateID: "1231234-4123123-76976766",
            },
            childs: [],
          },
        ],
      },
    ],
  },
  {
    id: "1231234-4123123-76976766",
    type: "template",
    childs: [
      {
        id: "123123",
        type: "wrapper",
        childs: [
          {
            id: "123123123213",
            type: "header",
            options: {
              size: 3,
            },
            childs: [],
          },
        ],
      },
    ],
  },
];

const routes = [
  { templateID: "1231234-4123123-12312312", path: "/" },
  { templateID: "1231234-4123123-76976766", path: "/help" },
];

function getQueryParams(url) {
  const paramArr = url.slice(url.indexOf("?") + 1).split("&");
  const params = {};
  paramArr.map((param) => {
    const [key, val] = param.split("=");
    params[key] = decodeURIComponent(val);
  });
  return params;
}

function initRoute() {
  let path = window.location.href;
  let params = getQueryParams(path);
  if (!params["path"]) {
    window.location.replace(path + "?path=/");
  }

  let currentRoute = routes.find((route) => route.path === params["path"]);
  if (!currentRoute) {
    // todo 404 page
  }

  let template = templates.find(
    (template) => template.id === currentRoute.templateID
  );
  if (!template) {
    // todo 404 page || not found template
  }

  let elem = getTemplate(template);
  document.getElementById("root").appendChild(elem);
}

function getTemplate(template, elem) {
  //   console.log("started", template.type, elem);
  let div = document.createElement("div");
  div.setAttribute("type", template.type);

  if (template.childs) {
    template.childs.forEach((child) => {
      let childElem = getRecursiveWidget(child);
      div.appendChild(childElem);
    });
  }
  return div;
}

function getRecursiveWidget(obj) {
  let div = document.createElement("div");
  div.setAttribute("type", obj.type);

  initWidget(obj, div);

  if (obj.childs) {
    obj.childs.forEach((child) => {
      let childElem = getRecursiveWidget(child);
      div.appendChild(childElem);
    });
  }

  return div;
}

function initWidget(obj, elem) {
  if (obj.type) {
    switch (obj.type) {
      case "input":
        let input = document.createElement("input");
        input.required = true;
        elem.appendChild(input);
        break;
      case "button":
        let btn = document.createElement("button");
        btn.onclick = () => {
          if (obj.options.onClick) {
            switch (obj.options.onClick) {
              case "open-template":
                window.location.replace(
                  "?path=" +
                    routes.find(
                      (route) => route.templateID === obj.options.templateID
                    ).path
                );
                break;
            }
          }
        };
        btn.innerText = "test";
        elem.appendChild(btn);
        break;
      case "header":
        let header = document.createElement("header");

        header.innerText = "test";
        elem.appendChild(header);
        break;
    }
  }
}

initRoute();
