export default class Helper {
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
