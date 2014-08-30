(function (window) {
	"use strict";

	var document = window.document,
		angular = window.angular,
		write = angular.module('write', []),
		sheetElement = document.getElementById('sheet');


  write.filter('o2a', function() {
    return function(input) {
      var out = []; 
      for(var i in input){
        out.push(input[i]);
      }
      return out;
    }
  });

	write.directive('sheet', [function () {
		var map = {
			'49': 'h1',
			'50': 'h2',
			'51': 'h3',
			'85': 'ul',
			'79': 'ol',
			'66': 'b',
			'73': 'i',
			'89': 'u'
		};

		return {
			link: function ($scope, element, attrs) {
				element.bind('keyup click', function (event) {
					$scope.$apply(function () {
						$scope.updateList();
					});
				});
			}
		};
	}]);

	write.controller('WriteCtrl', ['$scope', function ($scope) {
		$scope.styles = {
			paragraph: {
				p: {
					cmd: 'insertParagraph',
					label: 'Remove formating',
					icon: 'p',
					index: 0
				},
				h1: {
					cmd: 'formatBlock',
					value: 'h1',
					label: 'Heading 1',
					icon: 'h1',
					shortcut: 'command+1'
				},
				h2: {
					cmd: 'formatBlock',
					value: 'h2',
					label: 'Heading 2',
					icon: 'h2'
				},
				h3: {
					cmd: 'formatBlock',
					value: 'h3',
					label: 'Heading 3',
					icon: 'h3'
				},
				ul: {
					cmd: 'insertUnorderedList',
					label: 'Unordered list',
					icon: 'fontawesome-list-ul',
					shortcut: 'command+u'
				},
				ol: {
					cmd: 'insertOrderedList',
					label: 'Ordered list',
					icon: 'fontawesome-list-ol'
				}
			},
			character: {
				b: {
					cmd: 'bold',
					label: 'Bold',
					icon: 'fontawesome-bold'
				},
				i: {
					cmd: 'italic',
					label: 'Italic',
					icon: 'fontawesome-italic'
				},
				u: {
					cmd: 'underline',
					label: 'Underline',
					icon: 'fontawesome-underline'
				}
			}
		};

		function reset(list) {
			angular.forEach(list, function (data) {
				data.cls = '';
			});
		}

		function find(node) {
			var tagName,
				type,
				style;

			if (node !== document && node.tagName) {
				tagName = node.tagName.toLowerCase(),
				type = $scope.styles.paragraph[tagName],
				style = $scope.styles.character[tagName];
			
				if (type) {
					type.cls = 'active';
				}

				if (style) {
					style.cls = 'active';
				}
			}

			if (node.parentNode) {
				find(node.parentNode);
			}
		}

		$scope.save = function () {
			alert('Not implemented!');
			// var uriContent = "data:application/octet-stream," + encodeURIComponent(sheetElement.innerHTML);
			// window.open(uriContent, 'neuesDokument');
		};

		$scope.updateList = function () {
			reset($scope.styles.paragraph);
			reset($scope.styles.character);
			find(document.getSelection().focusNode);
		};

		$scope.updateStyle = function (style) {
			document.execCommand(style.cmd, false, style.value || null);
			$scope.updateList();
			sheet.focus();
		};

		sheet.focus();
	}]);

}(window));