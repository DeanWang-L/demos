function Barrel($ct) {
    this.$ct = $ct;
    this.imgNum = 40;
    this.baseHeight = 200;
    this.rowList = [];
    this.loadImg();
}

Barrel.prototype = {

    loadImg: function() {
        var _this = this;
        var imgsUrls = this.getImgUrls(100);

        $.each(imgsUrls, function(idx, url) {
            var img = new Image();
            img.src = url;
            img.onload = function() {
                var originWidth = img.width,
                    originHeight = img.height,
                    ratio = originWidth / originHeight;

                var imgInfo = {
                    target: $(img),
                    height: _this.baseHeight,
                    width: ratio * _this.baseHeight + 6,
                    ratio: ratio
                };
                _this.render(imgInfo);
            }
        })
    },

    render: function(imgInfo) {
        var _this = this;
        var rowList = this.rowList,
            rowHeight = 0,
            rowWidth = 0,
            clientWidth = this.$ct.width(),
            lastImgInfo = imgInfo;

        rowList.push(imgInfo);

        $.each(rowList, function(idx, imgInfo) {
            rowWidth += imgInfo.width;
            if (rowWidth > clientWidth) {
                rowList.pop();
                rowWidth = rowWidth - lastImgInfo.width;
                rowHeight = clientWidth * _this.baseHeight / rowWidth;

                _this.layout(rowHeight);
                _this.rowList = [];
                _this.rowList.push(lastImgInfo);
            }
        })
    },

    layout: function(rowHeight) {
        var $rowCt = $('<div class="img-row"></div>');
        $.each(this.rowList, function(idx, imgInfo) {
            var $imgCt = $('<div class="img-box "></div>'),
                $img = imgInfo.target;
            $img.height(rowHeight);
            $imgCt.append($img);
            $rowCt.append($imgCt);
        })
        this.$ct.append($rowCt);
    },

    getImgUrls: function(num) {
        var color, width, height, urls = [];
        for (var i = 0; i < num; i++) {
            color = Math.random().toString(16).substring(2, 8);
            width = Math.floor(Math.random() * 500 + 250);
            height = Math.floor(Math.random() * 150 + 250);
            urls.push('http://lorempixel.com/' + width + '/' + height + '/');
        }
        return urls;
    }

};

new Barrel($('.img-preview'));
