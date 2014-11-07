'use strict';

/**
 * Desktop managed frame
 *
 * @module ozpWebtop.dashboardView.desktop.managedFrame
 * @requires ozp.common.urlOriginComparer
 * @requires ozpWebtop.models.dashboard
 * @requires ozpWebtop.dashboardView.desktop.iframe
 */
angular.module('ozpWebtop.dashboardView.desktop.managedFrame', [
  'ozp.common.urlOriginComparer', 'ozpWebtop.models.dashboard',
  'ozpWebtop.dashboardView.desktop.iframe']);

/**
 * Used to include an html document in the webtop. If the html in question is from a different 
 * origin than the webtop, then an iframe will be used. If the html is from the same origin as
 * the webtop, a "frame" (div) will be used.
 *
 * ngtype: directive
 *
 * @namespace dashboardView
 * @class ozpManagedFrame
 * @constructor
 * @param {Function} compareUrl the URL comparison service
 * @param {Object} $http the Angular HTTP service
 * @param {Object} $compile the Angular compile service
 * @param {Object} $document the Angular document service
 * @param {Object} dashboardApi the API for dashboard information {{#crossLink "dashboardApi"}}{{/crossLink}}
 */
angular.module('ozpWebtop.dashboardView.desktop.managedFrame')
.directive('ozpManagedFrame', function (compareUrl, $http, $compile, $document, dashboardApi) {
  var resizableConfig = {
    // handles: 'all',
    handles: 'nw, sw, se, ne',
    aspectRatio: false,
    ghost: true,
    start: function(event,ui) {
      if(!event){
        console.debug(ui.element);
      }
      (ui.element).parent().parent().parent().css('pointer-events','none');//this is not smart, but works for the demo... will probably need a workaround for ie9
    },
    stop: function(event, ui) {
      if(!event){
        console.debug(ui.element);
      }
      (ui.element).parent().parent().parent().css('pointer-events','auto');//this is not smart, but works for the demo... will probably need a workaround for ie9
    }
  };

  var draggableConfig = {
    addClasses: true,
    scrollSensitivity: 100,
    scrollSpeed: 100,
    iframeFix: true,
    containment: 'document'
  };
  /**
   * Decides which template to use.
   *
   * @method getTemplate
   * @private
   * @param {Boolean} sameOrigin True if the frame comes from the same origin as the webtop,
   *     false otherwise.
   */
  var getTemplate = function (sameOrigin) {
    var template = '';

    // If different origin, use an iframe template
    if (!sameOrigin) {
      template = 'dashboardView/desktop/genericFrames/managediframe.tpl.html';
    }
    // otherwise, use a 'frame' (div) template
    else {
      template = 'dashboardView/desktop/genericFrames/managedframe.tpl.html';
    }
    return template;
  };

  // Directive definition object
  return {
    restrict: 'E',
    template: '<div ng-include="getContentUrl()"></div>',
    link: function postLink(scope, element) {
      element.draggable(draggableConfig);
      element.resizable(resizableConfig);
      // Logic for dragging is influenced by Angular directive documentation, under the
      // heading "Creating a Directive that Adds Event Listeners".
      // See: https://docs.angularjs.org/guide/directive

      // Get starting positions from state
      var startX = scope.frame.desktopLayout.left;
      var startY = scope.frame.desktopLayout.top;

      // 'Current' positions are changed as the element moves
      var x = startX, y = startY;

      // React to a mousedown and allow the element to move

        // TODO: find a more maintainable way?
        // Ignore click event if we clicked a button
      function start (event) {
        console.debug('event');
        console.debug(event);
        if (event.target.className.indexOf('glyphicon') > -1) {
          event.preventDefault();
          return;
        }
        // Bring frame to foreground
        if (scope.frame.desktopLayout.zIndex <= scope.max.zIndex) {
          scope.frame.desktopLayout.zIndex = scope.max.zIndex + 1;
          scope.max.zIndex = scope.frame.desktopLayout.zIndex;

          element.css({
            zIndex: scope.frame.desktopLayout.zIndex
          });
        }

        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
      }


      function stop (event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        // TODO: find a more maintainable way?

        if (event.target.className.indexOf('glyphicon') > -1) {
          event.preventDefault();
          return;
        }

        dashboardApi.updateDesktopFrame(
          scope.frame.id, 
          element[0].offsetLeft, 
          element[0].offsetTop, 
          element[0].offsetWidth, 
          element[0].offsetHeight, 
          scope.max.zIndex
        );
      }
      //add listeners
      element.on('mousedown resizestart', start);
      element.on('mouseup mouseleave resizestop', stop);
      // Is the origin the same as the webtop?
      // TODO: put this back
      // var origin = compareUrl(scope.frame.url);
      // For now, assume different origins
      var origin = false;

      // configure dynamic template without using $http for ease of testing
      scope.getContentUrl = function() {
        return getTemplate(origin);
      };

      // Note: in iframe template height and width of the iframe is calculated based on
      // these styles. May need to change it in the future.

      scope.styles = {
        'top': scope.frame.desktopLayout.top,
        'left': scope.frame.desktopLayout.left,
        'height': scope.frame.desktopLayout.height,
        'width': scope.frame.desktopLayout.width,
        'z-index': scope.frame.desktopLayout.zIndex
      };
    }
  };
});
