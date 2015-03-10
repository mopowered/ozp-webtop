'use strict';

/**
 * Edit Dashboard modal dialog
 *
 * @module ozpWebtop.settingsDashboardModal
 *
 * @requires ui.bootstrap
 *
 */

angular.module('ozpWebtop.settingsDashboardModal', ['ui.bootstrap',
  'ozpWebtop.models.dashboard']);

/**
 * Controller for Edit Dashboard modal
 *
 * @param $scope
 * @param $modalInstance
 * @constructor
 */
angular.module('ozpWebtop.settingsDashboardModal').controller(
  'SettingsDashboardModalInstanceCtrl', function($scope, $modalInstance) {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                            $scope properties
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                           initialization
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


    
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                          methods
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  
    /**
     * Handler invoked when dialog is closed via Ok button
     *
     *
     * @method openApps
     */
    $scope.ok = function () {

        $modalInstance.close();
      };

    /**
     * Handler invoked when modal is dismissed via the cancel button
     *
     * @method cancel
     */
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

});

