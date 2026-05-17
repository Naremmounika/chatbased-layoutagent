const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

function resizeArtboard(layout, newWidth, newHeight) {
  const updatedLayout = structuredClone(layout);

  const rootId = updatedLayout.rootNodes[0];
  const artboard = updatedLayout.nodes[rootId];

  artboard.width = newWidth;
  artboard.height = newHeight;

  artboard.children.forEach((childId) => {
    const node = updatedLayout.nodes[childId];

    node.x = node.nx * newWidth;
    node.y = node.ny * newHeight;
    node.width = node.nw * newWidth;
    node.height = node.nh * newHeight;
  });

  return updatedLayout;
}

function moveHeadlineToTop(layout) {
  const updatedLayout = structuredClone(layout);

  const rootId = updatedLayout.rootNodes[0];
  const artboard = updatedLayout.nodes[rootId];
  const headline = updatedLayout.nodes.headline1;

  headline.ny = 0.03;
  headline.y = headline.ny * artboard.height;

  return updatedLayout;
}

function makeHeadlineSmaller(layout) {
  const updatedLayout = structuredClone(layout);

  const rootId = updatedLayout.rootNodes[0];
  const artboard = updatedLayout.nodes[rootId];
  const headline = updatedLayout.nodes.headline1;

  headline.nw = headline.nw * 0.8;
  headline.nh = headline.nh * 0.8;

  headline.width = headline.nw * artboard.width;
  headline.height = headline.nh * artboard.height;

  return updatedLayout;
}
function centerProduct(layout) {
  const updatedLayout = structuredClone(layout);

  const rootId = updatedLayout.rootNodes[0];
  const artboard = updatedLayout.nodes[rootId];
  const product = updatedLayout.nodes.product1;

  product.nx = 0.27;
  product.ny = 0.3;

  product.x = product.nx * artboard.width;
  product.y = product.ny * artboard.height;

  return updatedLayout;
}

app.post("/api/chat", (req, res) => {
  const { message, layout } = req.body;

  const lowerMessage = message.toLowerCase().trim();

  let updatedLayout = layout;
  let reply = "Command not recognized";

  if (lowerMessage.includes("9:16")) {
    updatedLayout = resizeArtboard(layout, 1080, 1920);
    reply = "Converted layout to 9:16";
  } else if (
    lowerMessage.includes("headline") &&
    lowerMessage.includes("top")
  ) {
    updatedLayout = moveHeadlineToTop(layout);
    reply = "Moved headline to top";
  } else if (
    lowerMessage.includes("headline") &&
    lowerMessage.includes("smaller")
  ) {
    updatedLayout = makeHeadlineSmaller(layout);
    reply = "Made headline smaller";
  } 
  else if (
  lowerMessage.includes("product") &&
  lowerMessage.includes("center")
) {
  updatedLayout = centerProduct(layout);
  reply = "Centered product";
} 

  res.json({
    reply,
    updatedLayout
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});