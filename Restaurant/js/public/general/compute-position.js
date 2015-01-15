"use strict"
define(function (require, exports, module) {
    /**
     * 在一个元素上展示提示内容时，获取提示内容的位置
     * @param {Node} tooltipNode 包含提示内容的结点
     * @param {Node} tooltipForNode 提示结点
     * @param {string} position 提示位置 可选值为 left 、top、bottom、right 默认top
     * @param {string}tooltipNodeContainer 可选值body或者parent 默认值parent
     * @param {number} arrowSize 提示三角的尺寸 默认11
     */
    function getPosition(tooltipNode, tooltipForNode, position, tooltipNodeContainer, arrowSize) {
        position = position || "top"
        tooltipNodeContainer = tooltipNodeContainer || "parent"
        arrowSize = arrowSize || 11

        var tooltipNodePos = {
            left: 0,
            top: 0
        }
//        var tooltipForNodeStyle = getComputedStyle(tooltipForNode)
        var tooltipForNodeSize = {
            width: tooltipForNode.getClientRects()[0].width,
            height: tooltipForNode.getClientRects()[0].height
        }
        var tooltipForNodePos = tooltipNodeContainer === "parent" ? getNodeOffsetParentDistance(tooltipForNode) : getNodeDocumentDistance(tooltipForNode)
//        var tooltipNodeStyle = getComputedStyle(tooltipNode)
        var tooltipNodeSize = {
            width: tooltipNode.getClientRects()[0].width,
            height: tooltipNode.getClientRects()[0].height
        }


        switch (position) {
            case "top":
                tooltipNodePos.left = tooltipForNodePos.left - (tooltipNodeSize.width - tooltipForNodeSize.width) / 2
                tooltipNodePos.top = tooltipForNodePos.top - tooltipNodeSize.height - arrowSize
                break
            case "bottom":
                tooltipNodePos.left = tooltipForNodePos.left - (tooltipNodeSize.width - tooltipForNodeSize.width) / 2
                tooltipNodePos.top = tooltipForNodePos.top + tooltipForNodeSize.height + arrowSize
                break
            case "left":
                tooltipNodePos.left = tooltipForNodePos.left - tooltipNodeSize.width - arrowSize
                tooltipNodePos.top = tooltipForNodePos.top - (tooltipNodeSize.height - tooltipForNodeSize.height) / 2
                break
            case "right":
                tooltipNodePos.left = tooltipForNodePos.left + tooltipForNodeSize.width + arrowSize
                tooltipNodePos.top = tooltipForNodePos.top - (tooltipNodeSize.height - tooltipForNodeSize.height) / 2
                break
        }
        console.log(tooltipForNodePos)
        console.log({
            left: tooltipNodePos.left + "px",
            top: tooltipNodePos.top + "px"
        })
        return {
            left: tooltipNodePos.left + "px",
            top: tooltipNodePos.top + "px"
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
        getPosition: getPosition
    }
})