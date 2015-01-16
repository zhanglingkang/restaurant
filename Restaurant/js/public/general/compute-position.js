"use strict"
define(function (require, exports, module) {
    /**
     * 在一个元素上展示提示内容时，获取提示内容的位置
     * @param {Node} tooltipNode 包含提示内容的结点
     * @param {Node} primaryNode 提示结点
     * @param {string} position 提示位置 可选值为 left 、top、bottom、right 默认top
     * @param {string}tooltipNodeContainer 可选值body或者parent 默认值parent
     * @param {number} arrowSize 提示三角的尺寸 默认11
     * @returns {Object} {left:top:arrowPosition}
     */
    function getPosition(tooltipNode, primaryNode, position, tooltipNodeContainer, arrowSize) {
        position = position || "top"
        tooltipNodeContainer = tooltipNodeContainer || "parent"
        arrowSize = arrowSize || 11

        var tooltipNodePos = {
            left: 0,
            top: 0
        }
//        var primaryNodeStyle = getComputedStyle(primaryNode)
        var primaryNodeSize = {
            width: primaryNode.getClientRects()[0].width,
            height: primaryNode.getClientRects()[0].height
        }
        var primaryNodePos = tooltipNodeContainer === "parent" ? getNodeOffsetParentDistance(primaryNode) : getNodeDocumentDistance(primaryNode)
//        var tooltipNodeStyle = getComputedStyle(tooltipNode)
        var tooltipNodeSize = {
            width: tooltipNode.getClientRects()[0].width,
            height: tooltipNode.getClientRects()[0].height
        }
        var container = tooltipNodeContainer === "parent" ? primaryNode.offsetParent : document.documentElement
        var containerSize = {
            width: container.getClientRects()[0].width,
            height: container.getClientRects()[0].height
        }
        switch (position) {
            case "top":
                tooltipNodePos.left = primaryNodePos.left - (tooltipNodeSize.width - primaryNodeSize.width) / 2
                tooltipNodePos.top = primaryNodePos.top - tooltipNodeSize.height - arrowSize
                if (tooltipNodePos.left < 0) {
                    tooltipNodePos.arrowPosition = 0.5 - (0 - tooltipNodePos.left) / tooltipNodeSize.width
                    tooltipNodePos.left = 0
                } else if (tooltipNodePos.left + tooltipNodeSize.width > containerSize.width) {
                    tooltipNodePos.arrowPosition = 0.5 + (tooltipNodePos.left + tooltipNodeSize.width - containerSize.width) / tooltipNodeSize.width
                    tooltipNodePos.left = containerSize.width - tooltipNodeSize.width
                }
                break
            case "bottom":
                tooltipNodePos.left = primaryNodePos.left - (tooltipNodeSize.width - primaryNodeSize.width) / 2
                tooltipNodePos.top = primaryNodePos.top + primaryNodeSize.height + arrowSize
                break
            case "left":
                tooltipNodePos.left = primaryNodePos.left - tooltipNodeSize.width - arrowSize
                tooltipNodePos.top = primaryNodePos.top - (tooltipNodeSize.height - primaryNodeSize.height) / 2
                break
            case "right":
                tooltipNodePos.left = primaryNodePos.left + primaryNodeSize.width + arrowSize
                tooltipNodePos.top = primaryNodePos.top - (tooltipNodeSize.height - primaryNodeSize.height) / 2
                break
        }
        return {
            left: tooltipNodePos.left + "px",
            top: tooltipNodePos.top + "px",
            arrowPosition: tooltipNodePos.arrowPosition * 100 + "%"
        }
    }

    /**
     * @method getNodeDocumentDistance
     * @description 得到节点与文档顶部之间的距离
     * @param {Node} node
     * @return {Object} {left:,top:}
     */
    function getNodeDocumentDistance(node) {
        var nodeRec = node.getBoundingClientRect()
        return {
            top: window.pageYOffset + nodeRec.top,
            left: window.pageXOffset + nodeRec.left
        }
    }

    /**
     * @method getNodeOffsetParentDistance
     * @description 得到节点与包含块之间的距离
     * @param {Node} node 原生节点
     * @return {Object} {left:,top:}
     */
    function getNodeOffsetParentDistance(node) {
        var position = getNodeDocumentDistance(node)
        var offsetPosition = getNodeDocumentDistance(node.offsetParent)
        return {
            top: position.top - offsetPosition.top,
            left: position.left - offsetPosition.left
        }
    }

    return {
        getPosition: getPosition,
        getSize: function (node) {
            var rect = node.getClientRects()[0]
            return {
                width: rect.width,
                height: rect.height
            }
        }
    }
})