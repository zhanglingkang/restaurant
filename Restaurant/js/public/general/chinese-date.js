"use strict"

define(function (require, exports, module) {
    /**
     *
     * @param {Date} date 或者为空 为空则取today
     * @returns {Object}{chineseYear:"",chineseMonth:"",chineseDate:"",chineseSolarTerm:"",weekName:""}
     */
    function getChineseCalendar(date) {
        date = date || new Date()

        return {
            chineseYear: getChineseYear(date),
            chineseMonth: getChineseMonth(date),
            chineseDay: getChineseDate(date),
            chineseSolarTerm: getSolarTerm(date),
            weekName: getWeekName(date)
        }
    }

    function getWeekName(date) {
        var weekNameArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
        return weekNameArray[date.getDay()]
    }

    /**
     *
     * @param {Date} date
     * @returns {number} 3位或者4位数字，如农历日期为3月8号，返回值则为308，如农历日期为11月14号，则为1114
     */
    function getChineseDateNumber(date) {
        function DaysNumberofDate(date) {
            return parseInt((Date.parse(date) - Date.parse(date.getFullYear() + "/1/1")) / 86400000) + 1
        }

        var chineseData = [
            0x16, 0x2a, 0xda, 0x00, 0x83, 0x49, 0xb6, 0x05, 0x0e, 0x64, 0xbb, 0x00, 0x19, 0xb2, 0x5b, 0x00,
            0x87, 0x6a, 0x57, 0x04, 0x12, 0x75, 0x2b, 0x00, 0x1d, 0xb6, 0x95, 0x00, 0x8a, 0xad, 0x55, 0x02,
            0x15, 0x55, 0xaa, 0x00, 0x82, 0x55, 0x6c, 0x07, 0x0d, 0xc9, 0x76, 0x00, 0x17, 0x64, 0xb7, 0x00,
            0x86, 0xe4, 0xae, 0x05, 0x11, 0xea, 0x56, 0x00, 0x1b, 0x6d, 0x2a, 0x00, 0x88, 0x5a, 0xaa, 0x04,
            0x14, 0xad, 0x55, 0x00, 0x81, 0xaa, 0xd5, 0x09, 0x0b, 0x52, 0xea, 0x00, 0x16, 0xa9, 0x6d, 0x00,
            0x84, 0xa9, 0x5d, 0x06, 0x0f, 0xd4, 0xae, 0x00, 0x1a, 0xea, 0x4d, 0x00, 0x87, 0xba, 0x55, 0x04
        ]
        var chineseMonth = []
        var chineseMonthDays = []
        var chineseBeginDay
        var leapMonth
        var bytes = []
        var i
        var chineseMonthData
        var daysCount
        var chineseDaysCount
        var resultMonth
        var resultDay
        var yyyy = date.getFullYear()
        var mm = date.getMonth() + 1
        var dd = date.getDate()
        if (yyyy < 100) {
            yyyy += 1900
        }
        if (yyyy < 1997 || yyyy > 2020) {
            return 0
        }
        bytes[0] = chineseData[(yyyy - 1997) * 4]
        bytes[1] = chineseData[(yyyy - 1997) * 4 + 1]
        bytes[2] = chineseData[(yyyy - 1997) * 4 + 2]
        bytes[3] = chineseData[(yyyy - 1997) * 4 + 3]
        if ((bytes[0] & 0x80) != 0) {
            chineseMonth[0] = 12
        }
        else {
            chineseMonth[0] = 11
        }
        chineseBeginDay = (bytes[0] & 0x7f)
        chineseMonthData = bytes[1]
        chineseMonthData = chineseMonthData << 8
        chineseMonthData = chineseMonthData | bytes[2]
        leapMonth = bytes[3]
        for (i = 15; i >= 0; i--) {
            chineseMonthDays[15 - i] = 29
            if (((1 << i) & chineseMonthData) != 0) {
                chineseMonthDays[15 - i]++
            }
            if (chineseMonth[15 - i] == leapMonth) {
                chineseMonth[15 - i + 1] = -leapMonth
            }
            else {
                if (chineseMonth[15 - i] < 0) {
                    chineseMonth[15 - i + 1] = -chineseMonth[15 - i] + 1
                }
                else {
                    chineseMonth[15 - i + 1] = chineseMonth[15 - i] + 1
                }
                if (chineseMonth[15 - i + 1] > 12) {
                    chineseMonth[15 - i + 1] = 1
                }
            }
        }
        daysCount = DaysNumberofDate(date) - 1
        if (daysCount <= (chineseMonthDays[0] - chineseBeginDay)) {
            if ((yyyy > 1901) && (getChineseDateNumber(new Date((yyyy - 1) + "/12/31")) < 0)) {
                resultMonth = -chineseMonth[0]
            }
            else {
                resultMonth = chineseMonth[0]
            }
            resultDay = chineseBeginDay + daysCount
        }
        else {
            chineseDaysCount = chineseMonthDays[0] - chineseBeginDay
            i = 1
            while ((chineseDaysCount < daysCount) && (chineseDaysCount + chineseMonthDays[i] < daysCount)) {
                chineseDaysCount += chineseMonthDays[i]
                i++
            }
            resultMonth = chineseMonth[i]
            resultDay = daysCount - chineseDaysCount
        }
        if (resultMonth > 0) {
            return resultMonth * 100 + resultDay
        }
        else {
            return resultMonth * 100 - resultDay
        }
    }

    /**
     * 获取到天干地支记录法的年份
     * @param {Date} date
     * @returns {string} 如 甲午年
     */
    function getChineseYear(date) {
        /**
         * 获取天干地支法对应的年份
         * @param {number}  1864+yyyy为欲获取的年份 1864为甲子年
         * @returns {string}
         */
        function chineseYear(yyyy) {
            var tianGan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
//    var diZhi = ["子(鼠)", "丑(牛)", "寅(虎)", "卯(兔)", "辰(龙)", "巳(蛇)",
//        "午(马)", "未(羊)", "申(猴)", "酉(鸡)", "戌(狗)", "亥(猪)"]
            var diZhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥")
            return tianGan[yyyy % 10] + diZhi[yyyy % 12]
        }

        var yyyy = date.getFullYear()
        var mm = date.getMonth() + 1
        var chineseMM = parseInt(Math.abs(getChineseDateNumber(date)) / 100)
        if (yyyy < 100) {
            yyyy += 1900
        }
        if (chineseMM > mm) {
            yyyy--
        }
        yyyy -= 1864
        return chineseYear(yyyy)
    }

    /**
     * 农历日期的月份
     * @param {Date} date
     * @returns {string}
     */
    function getChineseMonth(date) {
        var chineseMonthArray = ["零", "正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"]
        var month = parseInt(getChineseDateNumber(date) / 100)
        if (month < 0) {
            return "闰" + chineseMonthArray[-month]
        }
        else {
            return chineseMonthArray[month]
        }
    }

    /**
     * 农历日期的日份
     * @param {Date} date
     * @returns {string}
     */
    function getChineseDate(date) {
        var chineseDayArray = ["零",
            "初一", "初二", "初三", "初四", "初五",
            "初六", "初七", "初八", "初九", "初十",
            "十一", "十二", "十三", "十四", "十五",
            "十六", "十七", "十八", "十九", "二十",
            "廿一", "廿二", "廿三", "廿四", "廿五",
            "廿六", "廿七", "廿八", "廿九", "三十"]
        var day = (Math.abs(getChineseDateNumber(date))) % 100
        return chineseDayArray[day]
    }

//function DaysNumberofMonth(date) {
//    var MM1 = date.getFullYear()
//    MM1 < 100 ? MM1 += 1900 : MM1
//    var MM2 = MM1
//    MM1 += "/" + (date.getMonth() + 1)
//    MM2 += "/" + (date.getMonth() + 2)
//    MM1 += "/1"
//    MM2 += "/1"
//    return parseInt((Date.parse(MM2) - Date.parse(MM1)) / 86400000)
//}

    /**
     * 获取节气 如果今天是某个节气，则返回对应的节气，否则返回空
     * @param {Date}date
     * @returns {string}
     */
    function getSolarTerm(date) {
        var solarTermArray = [
            "小寒", "大寒", "立春", "雨水", "惊蛰", "春分",
            "清明", "谷雨", "立夏", "小满", "芒种", "夏至",
            "小暑", "大暑", "立秋", "处暑", "白露", "秋分",
            "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"
        ]
        var DifferenceInMonth = [
            1272060, 1275495, 1281180, 1289445, 1299225, 1310355,
            1321560, 1333035, 1342770, 1350855, 1356420, 1359045,
            1358580, 1355055, 1348695, 1340040, 1329630, 1318455,
            1306935, 1297380, 1286865, 1277730, 1274550, 1271556
        ]
        var DifferenceInYear = 31556926
        var BeginTime = new Date(1901 / 1 / 1)
        BeginTime.setTime(947120460000)
        for (; date.getFullYear() < BeginTime.getFullYear();) {
            BeginTime.setTime(BeginTime.getTime() - DifferenceInYear * 1000)
        }
        for (; date.getFullYear() > BeginTime.getFullYear();) {
            BeginTime.setTime(BeginTime.getTime() + DifferenceInYear * 1000)
        }
        for (var M = 0; date.getMonth() > BeginTime.getMonth(); M++) {
            BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000)
        }
        if (date.getDate() > BeginTime.getDate()) {
            BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000)
            M++
        }
        if (date.getDate() > BeginTime.getDate()) {
            BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000)
            M == 23 ? M = 0 : M++
        }
        if (date.getDate() == BeginTime.getDate()) {
            return solarTermArray[M]
        }
        return ""
    }

//    var chineseDate = getChineseCalendar(new Date("2015-2-19"))
//    for (var key in chineseDate) {
//        console.log(chineseDate[key])
//    }

    var dateProto = {
        getChineseYear: getChineseYear.curryThis(),
        getChineseMonth: getChineseMonth.curryThis(),
        getChineseDate: getChineseDate.curryThis(),
        getSolarTerm: getSolarTerm.curryThis(),
        getWeekName: getWeekName.curryThis(),
        isToday: function () {
            return this.format("yyyy-MM-dd") === new Date().format("yyyy-MM-dd")
        },
        isSameDay: function (date) {
            return this.format("yyyy-MM-dd") === date.format("yyyy-MM-dd")
        },
        isBeforeToday: function () {
            return this.format("yyyy-MM-dd") < new Date().format("yyyy-MM-dd")
        },
        isAfterToday: function () {
            return this.format("yyyy-MM-dd") > new Date().format("yyyy-MM-dd")
        }
    }
    dateProto.__proto__ = Date.prototype
    var ChineseDate = function () {
        var newCode = "new Date(" + [].join.call(arguments, ",") + ")"
        var date = eval(newCode)
        date.__proto__ = dateProto
        return date
    }
    ChineseDate.getCountOfMonth = function (year, month) {
        var firstDay = new Date(year, month - 1, 1)
        var lastDay = new Date(year, month, 0)
        var count = (lastDay - firstDay) / (24 * 60 * 60 * 1000) + 1
        return count
    }
    module.exports = ChineseDate
})
//console.log(new ChineseDate(2014,2,1))