import MenuItem from "./MenuItem";
import icon from "../icon/icon";
 
export default class SelectTool extends MenuItem {
  getIconString() {
    return icon.near_me;
  }
  getIcon() {
    return 'flipY'
  }
  getTitle() {
    return this.props.title || "Select";
  }

  clickButton(e) {

    this.emit('selectItem');
  }
}
