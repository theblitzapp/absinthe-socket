import 'core-js/modules/es6.object.define-property';
import 'core-js/modules/es6.object.define-properties';
import 'core-js/modules/es7.object.get-own-property-descriptors';
import 'core-js/modules/es6.array.for-each';
import 'core-js/modules/es6.array.filter';
import 'core-js/modules/web.dom.iterable';
import 'core-js/modules/es6.array.iterator';
import 'core-js/modules/es6.object.keys';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';
import { requestToCompat, errorsToString } from '@jumpn/utils-graphql';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import 'core-js/modules/es6.function.name';
import { remove as remove$1, replace } from '@jumpn/utils-array';
import 'core-js/modules/es6.array.find-index';
import { hasIn, map } from '@jumpn/utils-composite';
import 'core-js/modules/es6.array.find';
import 'phoenix';

var _this = undefined;

var getNotifier = function getNotifier(handlerName, payload) {
  var _this2 = this;

  _newArrowCheck(this, _this);

  return function (observer) {
    _newArrowCheck(this, _this2);

    return observer[handlerName] && observer[handlerName](payload);
  }.bind(this);
}.bind(undefined);

var getHandlerName = function getHandlerName(_ref) {
  var name = _ref.name;

  _newArrowCheck(this, _this);

  return "on".concat(name);
}.bind(undefined);

var notifyAll = function notifyAll(observers, event) {
  _newArrowCheck(this, _this);

  return observers.forEach(getNotifier(getHandlerName(event), event.payload));
}.bind(undefined);

var _this$1 = undefined;

var getObservers = function getObservers(_ref) {
  var activeObservers = _ref.activeObservers,
      canceledObservers = _ref.canceledObservers;

  _newArrowCheck(this, _this$1);

  return [].concat(_toConsumableArray(activeObservers), _toConsumableArray(canceledObservers));
}.bind(undefined);

var notify = function notify(notifier, event) {
  _newArrowCheck(this, _this$1);

  notifyAll(getObservers(notifier), event);
  return notifier;
}.bind(undefined);

var _this$2 = undefined;

var findIndex = function findIndex(notifiers, key, value) {
  _newArrowCheck(this, _this$2);

  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
    notifiers.findIndex(hasIn([key], value))
  );
}.bind(undefined);

var _this$3 = undefined;

var remove = function remove(notifier) {
  var _this2 = this;

  _newArrowCheck(this, _this$3);

  return function (notifiers) {
    _newArrowCheck(this, _this2);

    return remove$1(findIndex(notifiers, "request", notifier.request), 1, notifiers);
  }.bind(this);
}.bind(undefined);

var _this$4 = undefined;

var updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck(this, _this$4);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

var eventNames = {
  abort: "Abort",
  cancel: "Cancel",
  error: "Error",
  result: "Result",
  start: "Start"
};

var _this$5 = undefined;

var createStartEvent = function createStartEvent(payload) {
  _newArrowCheck(this, _this$5);

  return {
    payload: payload,
    name: eventNames.start
  };
}.bind(undefined);

var createResultEvent = function createResultEvent(payload) {
  _newArrowCheck(this, _this$5);

  return {
    payload: payload,
    name: eventNames.result
  };
}.bind(undefined);

var createErrorEvent = function createErrorEvent(payload) {
  _newArrowCheck(this, _this$5);

  return {
    payload: payload,
    name: eventNames.error
  };
}.bind(undefined);

var createCancelEvent = function createCancelEvent() {
  _newArrowCheck(this, _this$5);

  return {
    name: eventNames.cancel,
    payload: undefined
  };
}.bind(undefined);

var createAbortEvent = function createAbortEvent(payload) {
  _newArrowCheck(this, _this$5);

  return {
    payload: payload,
    name: eventNames.abort
  };
}.bind(undefined);

var _this$6 = undefined;

var abortNotifier = function abortNotifier(absintheSocket, notifier, error) {
  _newArrowCheck(this, _this$6);

  return updateNotifiers(absintheSocket, remove(notify(notifier, createAbortEvent(error))));
}.bind(undefined);

var _this$7 = undefined;

var find = function find(notifiers, key, value) {
  _newArrowCheck(this, _this$7);

  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
    notifiers.find(hasIn([key], value))
  );
}.bind(undefined);

var _this$8 = undefined;

var notifyCanceled = function notifyCanceled(notifier, event) {
  _newArrowCheck(this, _this$8);

  notifyAll(notifier.canceledObservers, event);
  return notifier;
}.bind(undefined);

var _this$9 = undefined;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var clearCanceled = function clearCanceled(notifier) {
  _newArrowCheck(this, _this$9);

  return _objectSpread(_objectSpread({}, notifier), {}, {
    canceledObservers: []
  });
}.bind(undefined);

var flushCanceled = function flushCanceled(notifier) {
  _newArrowCheck(this, _this$9);

  return notifier.canceledObservers.length > 0 ? clearCanceled(notifyCanceled(notifier, createCancelEvent())) : notifier;
}.bind(undefined);

var _this$a = undefined;

var notifyActive = function notifyActive(notifier, event) {
  _newArrowCheck(this, _this$a);

  notifyAll(notifier.activeObservers, event);
  return notifier;
}.bind(undefined);

var _this$b = undefined;

var notifyResultEvent = function notifyResultEvent(notifier, result) {
  _newArrowCheck(this, _this$b);

  return notifyActive(notifier, createResultEvent(result));
}.bind(undefined);

var _this$c = undefined;

var notifyStartEvent = function notifyStartEvent(notifier) {
  _newArrowCheck(this, _this$c);

  return notifyActive(notifier, createStartEvent(notifier));
}.bind(undefined);

var requestStatuses = {
  canceled: "canceled",
  canceling: "canceling",
  pending: "pending",
  sent: "sent",
  sending: "sending"
};

var _this$d = undefined;

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var reset = function reset(notifier) {
  _newArrowCheck(this, _this$d);

  return flushCanceled(_objectSpread$1(_objectSpread$1({}, notifier), {}, {
    isActive: true,
    requestStatus: requestStatuses.pending,
    subscriptionId: undefined
  }));
}.bind(undefined);

var _this$e = undefined;

var handlePush = function handlePush(push, handler) {
  _newArrowCheck(this, _this$e);

  return push.receive("ok", handler.onSucceed).receive("error", handler.onError).receive("timeout", handler.onTimeout);
}.bind(undefined);

var _this$f = undefined;

var getPushHandlerMethodGetter = function getPushHandlerMethodGetter(absintheSocket, request) {
  var _this2 = this;

  _newArrowCheck(this, _this$f);

  return function (handle) {
    var _this3 = this;

    _newArrowCheck(this, _this2);

    return function () {
      _newArrowCheck(this, _this3);

      var notifier = find(absintheSocket.notifiers, "request", request);

      if (notifier) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        handle.apply(void 0, [absintheSocket, notifier].concat(args));
      }
    }.bind(this);
  }.bind(this);
}.bind(undefined);

var getPushHandler = function getPushHandler(absintheSocket, request, notifierPushHandler) {
  _newArrowCheck(this, _this$f);

  return map(getPushHandlerMethodGetter(absintheSocket, request), notifierPushHandler);
}.bind(undefined);

var pushAbsintheEvent = function pushAbsintheEvent(absintheSocket, request, notifierPushHandler, absintheEvent) {
  _newArrowCheck(this, _this$f);

  handlePush(absintheSocket.channel.push(absintheEvent.name, absintheEvent.payload), getPushHandler(absintheSocket, request, notifierPushHandler));
  return absintheSocket;
}.bind(undefined);

var _this$g = undefined;

var refresh = function refresh(notifier) {
  var _this2 = this;

  _newArrowCheck(this, _this$g);

  return function (notifiers) {
    _newArrowCheck(this, _this2);

    return replace(findIndex(notifiers, "request", notifier.request), [notifier], notifiers);
  }.bind(this);
}.bind(undefined);

var _this$h = undefined;

var refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
  _newArrowCheck(this, _this$h);

  updateNotifiers(absintheSocket, refresh(notifier));
  return notifier;
}.bind(undefined);

var absintheEventNames = {
  doc: "doc",
  unsubscribe: "unsubscribe"
};

var _this$i = undefined;

var createAbsintheUnsubscribeEvent = function createAbsintheUnsubscribeEvent(payload) {
  _newArrowCheck(this, _this$i);

  return {
    payload: payload,
    name: absintheEventNames.unsubscribe
  };
}.bind(undefined);

var createAbsintheDocEvent = function createAbsintheDocEvent(payload) {
  _newArrowCheck(this, _this$i);

  return {
    payload: payload,
    name: absintheEventNames.doc
  };
}.bind(undefined);

var _this$j = undefined;

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var pushAbsintheDocEvent = function pushAbsintheDocEvent(absintheSocket, _ref, notifierPushHandler) {
  var request = _ref.request;

  _newArrowCheck(this, _this$j);

  return pushAbsintheEvent(absintheSocket, request, notifierPushHandler, createAbsintheDocEvent(requestToCompat(request)));
}.bind(undefined);

var setNotifierRequestStatusSending = function setNotifierRequestStatusSending(absintheSocket, notifier) {
  _newArrowCheck(this, _this$j);

  return refreshNotifier(absintheSocket, _objectSpread$2(_objectSpread$2({}, notifier), {}, {
    requestStatus: requestStatuses.sending
  }));
}.bind(undefined);

var createRequestError = function createRequestError(message) {
  _newArrowCheck(this, _this$j);

  var error = new Error("request: ".concat(message));
  error.object = message;
  return error;
}.bind(undefined);

var onTimeout = function onTimeout(absintheSocket, notifier) {
  _newArrowCheck(this, _this$j);

  return notifyActive(notifier, createErrorEvent(createRequestError("timeout")));
}.bind(undefined);

var onError = function onError(absintheSocket, notifier, errorMessage) {
  _newArrowCheck(this, _this$j);

  return abortNotifier(absintheSocket, notifier, createRequestError(errorMessage));
}.bind(undefined);

var getNotifierPushHandler = function getNotifierPushHandler(onSucceed) {
  _newArrowCheck(this, _this$j);

  return {
    onError: onError,
    onSucceed: onSucceed,
    onTimeout: onTimeout
  };
}.bind(undefined);

var pushRequestUsing = function pushRequestUsing(absintheSocket, notifier, onSucceed) {
  _newArrowCheck(this, _this$j);

  return pushAbsintheDocEvent(absintheSocket, setNotifierRequestStatusSending(absintheSocket, notifier), getNotifierPushHandler(onSucceed));
}.bind(undefined);

var _this$k = undefined;

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var onUnsubscribeSucceedCanceled = function onUnsubscribeSucceedCanceled(absintheSocket, notifier) {
  _newArrowCheck(this, _this$k);

  return updateNotifiers(absintheSocket, remove(flushCanceled(notifier)));
}.bind(undefined);

var onUnsubscribeSucceedActive = function onUnsubscribeSucceedActive(absintheSocket, notifier) {
  _newArrowCheck(this, _this$k);

  return subscribe(absintheSocket, refreshNotifier(absintheSocket, reset(notifier)));
}.bind(undefined);

var createUnsubscribeError = function createUnsubscribeError(message) {
  _newArrowCheck(this, _this$k);

  return new Error("unsubscribe: ".concat(message));
}.bind(undefined);

var unsubscribeHandler = {
  onError: function onError(absintheSocket, notifier, errorMessage) {
    _newArrowCheck(this, _this$k);

    return abortNotifier(absintheSocket, notifier, createUnsubscribeError(errorMessage));
  }.bind(undefined),
  onTimeout: function onTimeout(absintheSocket, notifier) {
    _newArrowCheck(this, _this$k);

    return notifyCanceled(notifier, createErrorEvent(createUnsubscribeError("timeout")));
  }.bind(undefined),
  onSucceed: function onSucceed(absintheSocket, notifier) {
    _newArrowCheck(this, _this$k);

    if (notifier.isActive) {
      onUnsubscribeSucceedActive(absintheSocket, notifier);
    } else {
      onUnsubscribeSucceedCanceled(absintheSocket, notifier);
    }
  }.bind(undefined)
};

var pushAbsintheUnsubscribeEvent = function pushAbsintheUnsubscribeEvent(absintheSocket, _ref) {
  var request = _ref.request,
      subscriptionId = _ref.subscriptionId;

  _newArrowCheck(this, _this$k);

  return pushAbsintheEvent(absintheSocket, request, unsubscribeHandler, createAbsintheUnsubscribeEvent({
    subscriptionId: subscriptionId
  }));
}.bind(undefined);

var unsubscribe = function unsubscribe(absintheSocket, notifier) {
  _newArrowCheck(this, _this$k);

  return pushAbsintheUnsubscribeEvent(absintheSocket, refreshNotifier(absintheSocket, _objectSpread$3(_objectSpread$3({}, notifier), {}, {
    requestStatus: requestStatuses.canceling
  })));
}.bind(undefined);

var onSubscribeSucceed = function onSubscribeSucceed(absintheSocket, notifier, _ref2) {
  var subscriptionId = _ref2.subscriptionId;

  _newArrowCheck(this, _this$k);

  var subscribedNotifier = refreshNotifier(absintheSocket, _objectSpread$3(_objectSpread$3({}, notifier), {}, {
    subscriptionId: subscriptionId,
    requestStatus: requestStatuses.sent
  }));

  if (subscribedNotifier.isActive) {
    notifyStartEvent(subscribedNotifier);
  } else {
    unsubscribe(absintheSocket, subscribedNotifier);
  }
}.bind(undefined);

var onSubscribe = function onSubscribe(absintheSocket, notifier, response) {
  _newArrowCheck(this, _this$k);

  if (response.errors) {
    onError(absintheSocket, notifier, errorsToString(response.errors));
  } else {
    onSubscribeSucceed(absintheSocket, notifier, response);
  }
}.bind(undefined);

var subscribe = function subscribe(absintheSocket, notifier) {
  _newArrowCheck(this, _this$k);

  return pushRequestUsing(absintheSocket, notifier, onSubscribe);
}.bind(undefined);

var onDataMessage = function onDataMessage(absintheSocket, _ref3) {
  var payload = _ref3.payload;

  _newArrowCheck(this, _this$k);

  var notifier = find(absintheSocket.notifiers, "subscriptionId", payload.subscriptionId);

  if (notifier) {
    notifyResultEvent(notifier, payload.result);
  }
}.bind(undefined);

var dataMessageEventName = "subscription:data";

var isDataMessage = function isDataMessage(message) {
  _newArrowCheck(this, _this$k);

  return message.event === dataMessageEventName;
}.bind(undefined);

export { isDataMessage, onDataMessage, subscribe, unsubscribe };
//# sourceMappingURL=subscription.js.map
