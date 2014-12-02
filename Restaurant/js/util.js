;
(function () {
    var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;

    angular.module("ppzUtils", []).service('utilService', function () {
        return {
            /**
             * @method 为对象的属性设置值
             * @param obj 设置属性值的对象
             * @param property 属性名，可以为a.b,则为obj.a.b设置值
             * @param value
             */
            setPropertyValue: function (obj, property, value) {
                var propertyList = property.split(".");
                var lastPropertyName;
                propertyList.forEach(function (value, index) {
                    if (index < propertyList.length - 1) {
                        obj = obj[value];
                    }
                });
                lastPropertyName = propertyList.pop();
                obj[lastPropertyName] = value;
            }
        }
    })
}())