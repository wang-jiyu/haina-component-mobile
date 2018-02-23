
import * as React from 'react'
export interface IBubbleProps {
    y: number
}
export default class Bubble extends React.Component<IBubbleProps, any>{

    public ratio: number = parseInt(document.documentElement.dataset.dpr)
    public width: number = 50 * this.ratio
    public height: number = 80 * this.ratio
    public initRadius: number = 18 * this.ratio
    public minHeadRadius: number = 12 * this.ratio
    public minTailRadius: number = 5 * this.ratio
    public initArrowRadius: number = 10 * this.ratio
    public minArrowRadius: number = 6 * this.ratio
    public arrowWidth: number = 3 * this.ratio
    public maxDistance: number = 40 * this.ratio
    public initCenterX: number = 25 * this.ratio
    public initCenterY: number = 25 * this.ratio
    public headCenter = {
        x: this.initCenterX,
        y: this.initCenterY
    }

    public style = {
        width:this.width,
        height:this.height
    }
    static defaultProps = {
        y: 0
    }

    distance = Math.max(0, Math.min(this.props.y * this.ratio, this.maxDistance))

    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }
    componentDidMount() {
    }
    componentDidUpdate(){
    }
    componentWillReceiveProps(nextProps){
        this.distance = Math.max(0, Math.min(nextProps.y * this.ratio, this.maxDistance))
        this.style = {
            width:this.width,
            height:this.height
        }
        this._draw()
    }

    _draw() {
        const bubble = (this.refs.bubble as HTMLCanvasElement)
        let ctx = bubble.getContext('2d')
        ctx.clearRect(0, 0, bubble.width, bubble.height)

        this._drawBubble(ctx)

        this._drawArrow(ctx)
    }

    _drawBubble(ctx) {
        ctx.save()
        ctx.beginPath()

        const rate = this.distance / this.maxDistance
        const headRadius = this.initRadius - (this.initRadius - this.minHeadRadius) * rate

        this.headCenter.y = this.initCenterY - (this.initRadius - this.minHeadRadius) * rate

        // upper semicircle
        ctx.arc(this.headCenter.x, this.headCenter.y, headRadius, 0, Math.PI, true)

        // left bessel
        const tailRadius = this.initRadius - (this.initRadius - this.minTailRadius) * rate
        const tailCenter = {
            x: this.headCenter.x,
            y: this.headCenter.y + this.distance
        }

        const tailPointL = {
            x: tailCenter.x - tailRadius,
            y: tailCenter.y
        }
        const controlPointL = {
            x: tailPointL.x,
            y: tailPointL.y - this.distance / 2
        }

        ctx.quadraticCurveTo(controlPointL.x, controlPointL.y, tailPointL.x, tailPointL.y)

        // lower semicircle
        ctx.arc(tailCenter.x, tailCenter.y, tailRadius, Math.PI, 0, true)

        // right bessel
        const headPointR = {
            x: this.headCenter.x + headRadius,
            y: this.headCenter.y
        }
        const controlPointR = {
            x: tailCenter.x + tailRadius,
            y: headPointR.y + this.distance / 2
        }
        ctx.quadraticCurveTo(controlPointR.x, controlPointR.y, headPointR.x, headPointR.y)

        ctx.fillStyle = 'rgb(170,170,170)'
        ctx.fill()
        ctx.strokeStyle = 'rgb(153,153,153)'
        ctx.stroke()
        ctx.restore()
    }

    _drawArrow(ctx) {
        ctx.save()
        ctx.beginPath()

        const rate = this.distance / this.maxDistance
        const arrowRadius = this.initArrowRadius - (this.initArrowRadius - this.minArrowRadius) * rate

        // inner circle
        ctx.arc(this.headCenter.x, this.headCenter.y, arrowRadius - (this.arrowWidth - rate), -Math.PI / 2, 0, true)

        // outer circle
        ctx.arc(this.headCenter.x, this.headCenter.y, arrowRadius, 0, Math.PI * 3 / 2, false)

        ctx.lineTo(this.headCenter.x, this.headCenter.y - arrowRadius - this.arrowWidth / 2 + rate)
        ctx.lineTo(this.headCenter.x + this.arrowWidth * 2 - rate * 2, this.headCenter.y - arrowRadius + this.arrowWidth / 2)

        ctx.lineTo(this.headCenter.x, this.headCenter.y - arrowRadius + this.arrowWidth * 3 / 2 - rate)

        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.fill()
        ctx.strokeStyle = 'rgb(170,170,170)'
        ctx.stroke()
        ctx.restore()
    }


    render() {
        return (
            <canvas ref="bubble" width={this.width} height={this.height} style={this.style}></canvas>
        )
    }

}