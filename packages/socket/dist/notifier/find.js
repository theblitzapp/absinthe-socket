import 'core-js/modules/es6.array.find';
import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';
import { hasIn } from '@jumpn/utils-composite';

var _this = undefined;

var find = function find(notifiers, key, value) {
  _newArrowCheck(this, _this);

  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
    notifiers.find(hasIn([key], value))
  );
}.bind(undefined);

export default find;
//# sourceMappingURL=find.js.map
