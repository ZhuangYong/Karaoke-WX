import React from 'react';
import SlideItem from './slideItem';

// 首页图片轮播组件
class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cur: 0
        };
        // 滑动切换图片
        this.swipeStart = false;
        this.startX = 0;
        this.startY = 0;

        // 图片轮播用到的属性
        this.count = 0;
        this.moving = false;
        this.slideTimer = null;
        this.slideTimer2 = null;
        this.slideTimer3 = null;

        this.setCarousel = this.setCarousel.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.setCls = this.setCls.bind(this);
        this.setPos = this.setPos.bind(this);
    }

    handleMove(e) {
        if (e.touches && e.touches.length) {
            var touch = e.touches[0];
            var x = touch.clientX;
            var y = touch.clientY;
            if (this.startX == 0) {
                this.swipeStart = true;
                this.startX = x;
                this.startY = y;
            }
        }
    }

    handleEnd(e) {
        if (!this.swipeStart) {
            // console.log('没有touchmove');
            return;
        } else if (this.moving) {
            // console.log('图片正在移动中');
            return;
        } else if (e.changedTouches && e.changedTouches.length) {
            var touch = e.changedTouches[0];
            var x = touch.clientX;
            var y = touch.clientY;
            var diffX = Math.abs(x - this.startX);
            var diffY = Math.abs(y - this.startY);
            // console.log('diffX, diffY',diffX, diffY);
            // 如果x轴的唯一大于y轴，并且移动距离超过1/10屏幕宽度，图片滑动。
            // 向右滑，显示左边的图片，向左滑，显示右边的图片。
            if (diffX > diffY && diffX > HYAPP.APP_W / 10) {
                clearTimeout(this.slideTimer);
                clearTimeout(this.slideTimer2);
                if (x - this.startX > 0) {
                    this.setCls(true);
                } else {
                    this.setCls(false);
                }
            }
        }
        this.startX = 0;
        this.startY = 0;
        this.swipeStart = false;
    }

    handleCancel(e) {
        this.startX = 0;
        this.startY = 0;
        this.swipeStart = false;
    }

    /**
     * 设置class，移动到最右边时要先取消class，把图片放到最左边。延时200ms，设置slider位置。
     * @param {[type]} showLeft 是否向右滑动，显示左边的图片
     */
    setCls(showLeft) {
        var picData = this.props.slideData;
        if (picData.length < 2) {
            return;
        }
        if (showLeft) {
            this.count -= 1;
        } else {
            this.count += 1;
        }
        if (this.count > picData.length) {
            this.count = 1;
            this.refs.slider_box.className = 'slider-box';
            this.refs.slider_box.style.left = '0';
        }
        if (this.count < 0) {
            this.count = picData.length - 1;
            this.refs.slider_box.className = 'slider-box';
            this.refs.slider_box.style.left = '-' + (10 * picData.length) + 'rem';
        }
        this.moving = true;
        var _this = this;
        clearTimeout(this.slideTimer2);
        clearTimeout(this.slideTimer3);
        this.slideTimer2 = setTimeout(this.setPos, 200);
        this.slideTimer3 = setTimeout(function () {
            _this.moving = false;
        }, 1200);
    }

    // 设置位置，开始动画
    setPos() {
        var picData = this.props.slideData;
        this.refs.slider_box.className = 'slider-box slider-trans';
        this.refs.slider_box.style.left = '-' + (10 * this.count) + 'rem';
        var cur = this.count % picData.length;
        this.setState({
            cur: cur
        });
        clearTimeout(this.slideTimer);
        this.slideTimer = setTimeout(this.setCls, 4800);
    }

    // 设置轮播
    setCarousel() {
        if (this.props.slideData.length > 1) {
            clearTimeout(this.slideTimer);
            this.slideTimer = setTimeout(this.setCls, 4800);
        }
    }

    componentDidMount() {
        this.setCarousel();
    }

    componentDidUpdate(prevProps) {
        if (this.props.slideData.length != prevProps.slideData.length) {
            this.setCarousel();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.slideTimer);
        clearTimeout(this.slideTimer2);
        clearTimeout(this.slideTimer3);
    }


    render() {
        var slideData = this.props.slideData;
        var slideImgs = [];
        var slideDots = [];
        var slideW = '10rem';
        var curCls = '';

        for (var i = 0; i < slideData.length; i++) {
            if (i == this.state.cur) {
                curCls = 'cur';
            } else {
                curCls = '';
            }
            slideImgs.push(
                <SlideItem skip={this.props.skip} key={i} item={slideData[i]}></SlideItem>
            );
            slideDots.push(
                <span key={i} className={"slider-dot " + curCls}></span>
            );
        }
        if (slideData.length > 0) {
            slideImgs.push(
                <SlideItem skip={this.props.skip} key={slideData.length} item={slideData[0]}></SlideItem>
            );
            slideW = (slideData.length + 1) * 10 + 'rem';
        }

        return (
            <div
                className="slider"
                onTouchMove={this.handleMove}
                onTouchEnd={this.handleEnd}
                onTouchCancel={this.handleCancel}>
                <div className="slider-box slide-trans" ref="slider_box" style={{
                    width: slideW,
                    left: '0'
                }}>
                    {slideImgs}
                </div>
                <div className="slider-dots">
                    {slideDots}
                </div>
            </div>
        );
    }
}

export default Slider;
