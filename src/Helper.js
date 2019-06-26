export default class Helper {
  static noop (m = null) {
    if (m !== null) {
      console.log(m);
    }
  }

  static getRootNode (chart, seriesIndex = 0) {
    return chart
      .getModel()
      .getSeries()[seriesIndex]
      .getViewRoot()
      .children[0];
  }

  static getData (node) {
    return node.getModel().get();
  }
}
