import React, { cloneElement, useContext, useEffect, useRef } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { TourContext } from '../../contexts/tour/tour-context';
import { testIdWithKey } from '../../utils/testable';
/**
 * React functional component used to attach and step to another component by
 * only wrapping it. Use its props to customize the behavior.
 *
 * @param props the component props
 * @returns an AttachTourStep React element
 */
export function AttachTourStep({
  children,
  fill = false,
  index,
  tourID
}) {
  var _children$props;
  const {
    currentStep,
    currentTour,
    changeSpot
  } = useContext(TourContext);
  const {
    width: windowWidth,
    height: windowHeight
  } = useWindowDimensions();
  const childRef = useRef(null);
  useEffect(() => {
    if (currentTour === tourID && currentStep === index) {
      var _childRef$current;
      (_childRef$current = childRef.current) === null || _childRef$current === void 0 || _childRef$current.measureInWindow((x, y, width, height) => {
        changeSpot({
          height,
          width,
          x,
          y
        });
      });
    }
  }, [windowWidth, windowHeight, changeSpot, currentTour, currentStep, index]);
  const {
    style,
    ...rest
  } = children.props;
  const childStyle = style ?? {};
  return /*#__PURE__*/React.createElement(View, {
    testID: testIdWithKey('AttachTourStep'),
    ref: childRef,
    style: {
      alignSelf: fill ? 'stretch' : 'center',
      ...childStyle
    },
    collapsable: false,
    focusable: false
  }, /*#__PURE__*/cloneElement(children, rest, (_children$props = children.props) === null || _children$props === void 0 ? void 0 : _children$props.children));
}
//# sourceMappingURL=AttachTourStep.js.map