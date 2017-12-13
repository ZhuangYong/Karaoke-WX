/**
 * Created by Zed on 2017/8/18.
 */
import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import intl from 'react-intl-universal';

class Protocol extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("title.payment"));
    }

    componentDidMount() {
        const content = `<p style="margin-bottom:10px;text-align:center;vertical-align:baseline;background:rgb(255,255,255)">
  <strong><span style="font-family: 宋体;font-size: 19px"><span style="font-family:宋体">金麦客</span></span></strong><strong><span style="font-family: 宋体;font-size: 19px"><span style="font-family:宋体">支付</span></span></strong><strong><span style="font-family: 宋体;font-size: 19px"><span style="font-family:宋体">协议</span></span></strong>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">欢迎您</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">使用金麦客平台</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">！</span></span></strong>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">为使用</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">金麦客软件及享受会员服务</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">，您应当阅读并遵守《</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">金麦客支付协议</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">》</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px">(</span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">以下简称</span>“本协议”</span></strong><strong><span style="font-family: 宋体;font-size: 16px">)</span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">。请您务必审慎阅读、充分理解各条款内容，并选择</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">同意</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">或不</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">同意</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">。除非您已阅读并接受本协议所有条款，否则您无权使用。</span></span></strong>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">未成年人应在法定监护人陪同下审阅和履行，未成年人行使和履行本协议项下的权利和义务视为已获得了法定监护人的认可。</span></span></strong>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">一、</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">定义</span></span></strong>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">1.1 本协议是您与<span style="font-family:宋体">天津金麦客科技有限公司</span><span style="font-family:宋体">之间</span>(<span style="font-family:宋体">下称</span>“金麦客”)<span style="font-family:宋体">关于您使用</span>“<span style="font-family:宋体">金麦客平台</span>”<span style="font-family:宋体">，享受金麦客</span>VIP会员服务<span style="font-family:宋体">所订立的协议。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">1.2“金麦客软件”：指天津金麦客科技有限公司研发的一种音乐、视频服务软件，<span style="font-family:宋体">简称</span>“<span style="font-family:宋体">金麦客平台</span>”<span style="font-family:宋体">。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">1.3<span style="font-family:宋体">用户</span><span style="font-family:宋体">：是指使用</span>“<span style="font-family:宋体">金麦客软件</span>”的个人或组织<span style="font-family:宋体">，包含付费及非付费用户</span><span style="font-family:宋体">，在本协议中更多地称为</span>“您”。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">1.4 VIP会员，是指金麦客的付费用户(<span style="font-family:宋体">包含赠送会员</span>)<span style="font-family:宋体">。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">1.5服务，指金麦客现有及将来提供的产品及服务。</span>
</p>
<p style="text-indent: 28px;vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">金麦客平台目前向用户提供如下服务：</span></span>
</p>
<p style="text-indent: 28px;vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">正版卡拉</span>OK歌曲使用、第三方软件的使用。</span>
</p>
<p style="text-indent: 28px;vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">除非本协议另有其它明示规定，金麦客均受到本协议之约束。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">二、</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">协议范围</span></span></strong>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">2.1<span style="font-family:宋体">本协议内容包括《</span><span style="font-family:宋体">金麦客支付协议</span><span style="font-family:宋体">》</span><span style="font-family:宋体">及专项规则等</span><span style="font-family:宋体">。</span><span style="font-family:宋体">您在使用</span><span style="font-family:宋体">金麦客提供</span><span style="font-family:宋体">某一或多个特定服务时，该服务可能会另有专项的服务声明</span><span style="font-family:宋体">、</span><span style="font-family:宋体">规则及公告指引等</span>(<span style="font-family:宋体">以下统称为</span>“专项规则”)<span style="font-family:宋体">。上述内容一经发布，即为本协议不可分割的组成部分，您同样应当遵守。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">2.2金麦客<span style="font-family:宋体">有权随时对</span><span style="font-family:宋体">本</span><span style="font-family:宋体">协议以及专项规则等内容进行修改，</span>&nbsp;<span style="font-family:宋体">如果您不同意修改</span><span style="font-family:宋体">内容</span><span style="font-family:宋体">，</span><span style="font-family:宋体">您</span><span style="font-family:宋体">可以取消已经获取的服务并停止使用；如果</span><span style="font-family:宋体">您</span><span style="font-family:宋体">继续使用，则视为</span><span style="font-family:宋体">您</span><span style="font-family:宋体">接受</span><span style="font-family:宋体">相应</span><span style="font-family:宋体">修改。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">三、版权声明</span></span></strong>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">3.1 金麦客提供的内容(<span style="font-family:宋体">包括但不限于网页、文字、图片、音频、视频、图表等</span>)<span style="font-family:宋体">以及</span>“金麦客软件”所使用的内容、图像、头像形象等商业标识，其著作权或商标权归金麦客或与金麦客合作版权方所有。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">3.2“金麦客软件”及有关的技术、知识和任何构想、概念或其他的知识产权均归金麦客或与金麦客合作方所有。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">3.3您仅在本协议明示的范围内享有“金麦客软件”及相关服务的使用权。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">3.4本协议不表示任何知识产权的转移，非经书面授权，您不得实施以下行为：</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(1)<span style="font-family:宋体">将金麦客提供的内容无偿或有偿提供、销售、转让、出租、出借或提供分许可、再许可、通过信息网络传播或非本协议允许的其他方式供他人使用或向公开场合向他人展示；</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(2)<span style="font-family:宋体">限制使用、破坏或绕过</span>“金麦客软件”附带的加密附件或加密措施(<span style="font-family:宋体">若有</span>)<span style="font-family:宋体">或金麦客提供的其他确保</span>“金麦客软件”正确使用的限制性措施使用金麦客服务内容；</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(3)<span style="font-family:宋体">修改、合成，或进行其他教学、研究、开发，或生成衍生作品、服务。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(4)<span style="font-family:宋体">除掉、掩盖或更改关于著作权声明、权利人标识或商标的标志；</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(5)<span style="font-family:宋体">嵌套、链接金麦客服务提供的内容；</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(6)<span style="font-family:宋体">对</span>“金麦客软件”及附加程序或措施实施翻译、逆向工程等。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">3.5您使用金麦客服务及发布的内容，应尊重知识产权人的知识产权，保证不会侵犯任何第三方的合法权益。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-weight: bold;font-size: 16px">四、</span><strong><span style="font-family: 宋体;font-size: 16px">VIP会员账号</span></strong>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">4.1 用户可通过各种已有和未来新增的渠道成为金麦客VIP会员，包括但不限于：通过微信、支付宝等第三方支付方式成为VIP会员。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">4.2 金麦客VIP会员账号所有权归金麦客所有。金麦客有权将账号下产生的内容、数据进行收集、整理、分析；并有权对可能违法违规或违反本协议或发布不文明内容账号采取封禁、撤销、暂停等措施。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">4.3 VIP会员拥有金麦客账号的有限使用权。<span style="font-family:宋体">您可以通过登录金麦客</span>VIP会员中心免费查询您的账号信息详情，包括已开通的服务内容、服务期限、消费金额、交易状态等。您应自行负责妥善且正确地保管、使用、维护您在金麦客申请取得的账户、账户信息及账户密码。您应对您账户信息和账户密码采取必要和有效的保密措施。非金麦客原因致使您账户密码泄漏以及因您保管、使用、维护不当造成损失的，金麦客无须承担与此有关的任何责任。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">4.4 &nbsp;VIP会员可以在任何时候申请终止VIP会员服务，但金麦客仍旧提供完当期(<span style="font-family:宋体">当期指会员单次购买的所有有效期：分月度、季度、半年、年</span>)<span style="font-family:宋体">服务，不退还当期费用。</span>VIP服务将于下期取消，并自动停止下期扣费。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">4.5&nbsp;<span style="font-family:宋体">金麦客在此声明：金麦客从未授权任何第三方单位或个人销售、转让金麦客</span>VIP会员资格，任何未经授权销售金麦客VIP会员的属于非法销售，金麦客有权追究其法律责任。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-weight: bold;font-size: 16px">五、</span><strong><span style="font-family: 宋体;font-size: 16px">VIP会员费用</span></strong>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">5.1&nbsp;VIP会员的增值服务资费标准以<span style="font-family:宋体">金麦客平台软件界面</span>(<span style="font-family:宋体">包含大屏端和手机端</span>)<span style="font-family:宋体">公示</span><span style="font-family:宋体">的详细资费标价为准，金麦客有权基于</span><span style="font-family:宋体">市场及服务的</span><span style="font-family:宋体">发展变更上述资费标准</span><span style="font-family:宋体">。</span><span style="font-family:宋体">金麦客会根据实际运营情况对不同阶段已经激活且持续有效的</span>VIP会员给予续费、升级方面的不同资费优惠，具体优惠政策以金麦客在相关服务页面公告的内容为准。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">5.2&nbsp;<span style="font-family:宋体">您明确了解并同意，金麦客</span>VIP会员的付费方式为<span style="font-family:宋体">第三方支付方式代收</span><span style="font-family:宋体">，您通过此种付费方式付费可能存在一定的商业风险，包括但不限于不法分子利用您账户或银行卡等有价卡等进行违法活动，该等风险均会给您造成相应的经济损失。您应自行承担向侵权方追究侵权责任和追究责任不能的后果。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">5.3&nbsp;<span style="font-family:宋体">金麦客仅提供相关的网络服务，除此之外与相关网络服务有关的设备</span>(<span style="font-family:宋体">如个人电脑、手机、及其他与接入互联网或移动网有关的装置</span>)<span style="font-family:宋体">及所需的费用</span>(<span style="font-family:宋体">如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费</span>)<span style="font-family:宋体">均应由</span>VIP会员自行负担。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-weight: bold;font-size: 16px">六、</span><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">权益及限制</span></span></strong>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">6.1在VIP会员有效期内，VIP会员可优先参加由金麦客组织的活动并享有由金麦客提供的各项优惠及增值服务。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">6.2 VIP会员有效期内，金麦客可能会对服务器、软件、平台、内容库等进行升级、维护、维修、更新或不可抗力导致的服务短暂合理时间的暂停、中断，您的服务周期不会因此延长。 </span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">6.3&nbsp;VIP会员服务提供的服务内容，尤其是版权内容(<span style="font-family:宋体">例如：音频、视频</span>)<span style="font-family:宋体">都有特定的使授权使用期限，您成为</span>VIP会员即视为认可相应的授权期限。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">6.5&nbsp;VIP会员可享受的全部权益以金麦客官方公布的会员权益为准，金麦客有权基于金麦客自身业务发展需要变更全部或部分会员权益，并进行相应规则变更，您有权选择继续使用或停止使用。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">6.6<span style="font-family:宋体">同一</span>VIP账号允许在最多1<span style="font-family:宋体">个设备上使用，且同一时间同一账号仅可在</span>1<span style="font-family:宋体">个设备上登录</span><span style="font-family:宋体">使用。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">6.7 VIP会员服务仅限于申请账号自行使用；VIP会员服务期内不能在金麦客<span style="font-family:宋体">账</span><span style="font-family:宋体">号之间转移，禁止赠与、借用、转让或售卖。否则金麦客有权在未经通知的情况下取消转让账户、受让账户的</span>VIP会员服务资格，由此带来的损失由VIP会员自行承担。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">6.8 VIP会员不得以盗窃、利用系统漏洞等非法途径以及在未获金麦客授权的非法销售金麦客VIP会员的网站上获取或购买VIP会员服务，否则金麦客有权取消VIP会员的服务资格。由此引发的问题由VIP会员自行承担，金麦客不负任何责任。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">6.9 VIP会员不得将VIP会员账户有偿或无偿提供给任何第三人，并允许他人通过您的账户观看收听非他人付费购买的VIP会员服务提供的音视频。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">6.10 VIP不得利用“金麦客软件”及账号实施如下行为：</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(1)<span style="font-family:宋体">提交、发布虚假信息，或冒充、利用他人名义；</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(2)<span style="font-family:宋体">侵害他人名誉权、肖像权、知识产权、商业秘密、财产权等合法权利及利益；</span> </span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(3)<span style="font-family:宋体">使用</span><span style="font-family:宋体">非法、淫秽、污辱或人身攻击的含义污辱或人身攻击的</span><span style="font-family:宋体">昵</span><span style="font-family:宋体">称和签名档</span><span style="font-family:宋体">，或其他不文明不道德行为；</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(4)<span style="font-family:宋体">发布商品、服务的介绍或链接、广告、垃圾邮件等。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(5)<span style="font-family:宋体">发布、转载、上传其他危害社会、国家，引起社会恐慌的言论或内容</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(6)<span style="font-family:宋体">收集他人资料、信息，盗窃、破坏他人账号。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(7)<span style="font-family:宋体">其他违反法律法规、犯罪或实施金麦客未授权的其他行为。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">6.11您亦应遵守本协议“三、版权声明”条款中规定的相关<span style="font-family:宋体">使用限制。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">6.12您的任何<span style="font-family:宋体">违反或被视为违反本</span><span style="font-family:宋体">协议相应规定的</span><span style="font-family:宋体">内容，金麦客有权在</span><span style="font-family:宋体">未经通知您</span><span style="font-family:宋体">的情况下</span><span style="font-family:宋体">根据情形酌情采取封禁会员账号、</span><span style="font-family:宋体">终止</span><span style="font-family:宋体">账号会员</span><span style="font-family:宋体">服务</span><span style="font-family:宋体">等措施</span><span style="font-family:宋体">，但不退还任何已缴纳的</span>VIP会员服务费用<span style="font-family:宋体">。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-family:宋体">账号被封禁的，您</span><span style="font-family:宋体">可根据金麦客公布的解禁流程进行账号解禁，同一账号累计被封禁</span><span style="font-family:宋体">达到</span>3次的<span style="font-family:宋体">，</span><span style="font-family:宋体">金麦客有权收回该账号使用权或</span><span style="font-family:宋体">终止</span><span style="font-family:宋体">该账号</span>VIP资格。用户应当自行承担超范围使用而导致的任何损失，同时金麦客保留追究上述行为人法律责任的权利。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-weight: bold;font-size: 16px">七、</span><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">用户个人信息保护</span></span></strong>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">7.1<span style="font-family:宋体">金麦客非常重视用户个人信息的保护</span><span style="font-family:宋体">，我们将严格对您的个人信息进行保密</span><span style="font-family:宋体">。您的个人账户信息只用作金麦客平台，包括</span><span style="font-family:宋体">但不限于</span><span style="font-family:宋体">我们的数据收集、存储</span><span style="font-family:宋体">、</span><span style="font-family:宋体">分析、</span><span style="font-family:宋体">使用。</span><span style="font-family:宋体">我们承诺</span><span style="font-family:宋体">除非您同意，否则我们</span><span style="font-family:宋体">不会</span><span style="font-family:宋体">擅自</span><span style="font-family:宋体">将您的个人信息披露给第三方，且不会</span><span style="font-family:宋体">私自</span><span style="font-family:宋体">用于其它用途</span><span style="font-family:宋体">。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">7.2<span style="font-family:宋体">因不可抗力及非金麦客人为因素造成的用户信息泄露，金麦客将第一时间采取措施防止您的信息继续泄露、扩散，以保障您的信息安全。</span><span style="font-family:宋体">但由此造成的用户</span><span style="font-family:宋体">损失金麦客不承担</span><span style="font-family:宋体">任何</span><span style="font-family:宋体">责任</span><span style="font-family:宋体">。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">八</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">、风险及免责</span></span></strong>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">8.1使用“金麦客软件”可能面临以下主要风险：</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(1)<span style="font-family:宋体">兼容性风险：</span>“<span style="font-family:宋体">金麦客软件</span>”可能<span style="font-family:宋体">不支持某种操作系统、框架、浏览器，或与其他组件、软件、硬件不兼容；</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(2)<span style="font-family:宋体">不熟练风险：因不熟练</span>“金麦客软件”导致错误操作；</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(3)<span style="font-family:宋体">衍生风险：不恰当嵌入或以其他形式使用，导致软件、系统产生漏洞；</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">(4)<span style="font-family:宋体">固有风险：金麦客保证原始发布的</span>“金麦客软件”不含有后门、炸弹、病毒，但不能排除可能存在的未知BUG或其他风险。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">8.2“金麦客软件”可能保留有与第三方网站或网址的链接，金麦客出于方便您使用特定链接的目的提供，并不保证这些链接所提供的涉及特定的具体信息、数据、观点、图片、陈述或建议的准确性及可靠性。提供这些链接仅仅在于提供方便，非出于宣传或广告目的，并非表示对这些链接上特定、具体内容的认可和推荐，是否访问这些链接将由您自主决定。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">8.3您理解并同意，因不可抗力或政策变化，金麦客保留单方面对提供的全部或部分服务内容在任何时候不经任何通知的情况下变更、暂停、限制、升级、终止或撤销的权利，您需承担此风险。金麦客尽可能做出事前通知，除非事前通知不可能，则金麦客将及时发表事后声明。金麦客对因此导致的服务的终止、中断、暂停、撤销等及引起的用户的损失不承担法律责任。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">8.4您理解并同意，您已经充分了解可能面临的上述风险，您可以自主选择接受或不接受本协议，并在接受本协议的前提下，自主决定是否使用使用服务，并对使用行为负责，承担结果。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">8.5金麦客不对您的个人行为产生的侵权、损害或其他后果承担任何责任。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-weight: bold;font-size: 16px">九、</span><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">协议</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">的终止</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0">
  <strong><span style="font-family: 宋体">9</span></strong><strong><span style="font-family: 宋体">.1 </span></strong><strong><span style="font-family: 宋体"><span style="font-family:宋体">终止的情形</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0">
  <strong><span style="font-family: 宋体">9.1.1</span></strong><strong><span style="font-family: 宋体"><span style="font-family:宋体">【用户发起的终止】</span></span></strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">您有权通过以下任一方式终止本协议：</span></span>
</p>
<p style="margin-top:0;margin-bottom:0">
  <span style="font-family: 宋体;font-size: 16px">(<span style="font-family:宋体">一</span>)<span style="font-family:宋体">您通过</span></span><span style="text-decoration:underline;"><span style="font-family: 宋体"><span style="font-family:宋体">网站或者</span></span><span style="font-family: 宋体"><span style="font-family:宋体">手机</span></span><span style="font-family: 宋体">APP</span><span style="font-family: 宋体"><span style="font-family:宋体">或其他客户终端应用</span></span><span style="font-family: 宋体"><span style="font-family:宋体">自助服务</span></span></span><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">注销您的账户的；</span></span>
</p>
<p style="margin-top:0;margin-bottom:0">
  <span style="font-family: 宋体;font-size: 16px">(<span style="font-family:宋体">二</span>)<span style="font-family:宋体">变更事项生效前您停止使用并明示不愿接受变更事项的；</span></span>
</p>
<p style="margin-top:0;margin-bottom:0">
  <span style="font-family: 宋体;font-size: 16px">(<span style="font-family:宋体">三</span>)<span style="font-family:宋体">您明示不愿继续使用金麦客平台服务，且符合金麦客终止条件的。</span>&nbsp;</span>
</p>
<p style="margin-top:0;margin-bottom:0">
  <strong><span style="font-family: 宋体">9.1.2</span></strong><strong><span style="font-family: 宋体"><span style="font-family:宋体">【金麦客发起的终止】</span></span></strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">出现以下情况时，金麦客可以通知您终止本协议：</span></span>
</p>
<p style="margin-top:0;margin-bottom:0">
  <span style="font-family: 宋体;font-size: 16px">(<span style="font-family:宋体">一</span>)<span style="font-family:宋体">您违反本协议约定，金麦客依据</span>6.12条款终止本协议的；</span>
</p>
<p style="margin-top:0;margin-bottom:0">
  <span style="font-family: 宋体;font-size: 16px">(<span style="font-family:宋体">二</span>)<span style="font-family:宋体">除上述情形外，因您多次违反金麦客平台规则相关规定且情节严重，金麦客依据金麦客平台规则对您的账户予以查封的；</span></span>
</p>
<p style="margin-top:0;margin-bottom:0">
  <span style="font-family: 宋体;font-size: 16px">(<span style="font-family:宋体">三</span>)<span style="font-family:宋体">其它应当终止服务的情况。</span>&nbsp;</span>
</p>
<p style="margin-top:0;margin-bottom:0">
  <strong><span style="font-family: 宋体">9.2 </span></strong><strong><span style="font-family: 宋体"><span style="font-family:宋体">协议终止后的处理</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0">
  <strong><span style="font-family: 宋体"><span style="font-family:宋体">【用户信息披露】</span></span></strong><strong><span style="text-decoration:underline;"><span style="font-family: 宋体"><span style="font-family:宋体">本协议终止后，除法律有明确规定外，金麦客无义务向您或您指定的第三方披露您账户中的任何信息。</span></span></span></strong><span style="font-family: 宋体;font-size: 16px">&nbsp;</span>
</p>
<p style="margin-top:0;margin-bottom:0">
  <strong><span style="font-family: 宋体"><span style="font-family:宋体">【金麦客权利】</span></span></strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">本协议终止后，金麦客仍享有下列权利：</span></span>
</p>
<p style="margin-top:0;margin-bottom:0">
  <span style="font-family: 宋体;font-size: 16px">(<span style="font-family:宋体">一</span>)<span style="font-family:宋体">继续保存您留存于金麦客平台的本协议第五条所列的各类信息；</span></span>
</p>
<p style="margin-top:0;margin-bottom:0">
  <span style="font-family: 宋体;font-size: 16px">(<span style="font-family:宋体">二</span>)<span style="font-family:宋体">对于您过往的违约行为，金麦客仍可依据本协议向您追究违约责任</span><span style="font-family:宋体">。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">十、法律责任</span></span></strong>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">10.1您理解并同意，因您违反本协议或专项规则的规定，导致或产生的任何第三方的任何索赔、主张或损失，包括但不限于合理的律师费、诉讼费、赔偿费等，您应当进行赔偿；若因此给金麦客或其合作公司、关联公司造成损失的，您应承担全部损失的赔偿责任。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">10.2您如果未经金麦客的书面许可而进行任何商业使用，金麦客公司保留依据其现实有效的定价标准要求您补缴费用，并要求您赔偿损失的权利。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">十一</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">、法律适用与争议解决</span></span></strong>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">11.1本协议的订立、效力、解释、履行和争议的解决均适用中华人民共和国法律、法规、电信管理部门的规定和计算机行业的国家强制性的规范及版权相关部门及行业规范；<span style="font-family:宋体">如</span><span style="font-family:宋体">法律无相关规定的，参照商业惯例或者行业惯例</span><span style="font-family:宋体">。</span></span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">11.2有关本协议的任何争议应友好协商解决。若协商不成，您同意将争议提交至北京市朝阳区人民法院以诉讼方式解决。</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">11.3您若对于本协议有疑问，进行举报或投诉，请致电：18180425350 &nbsp;或邮件至：service@j-make.cn</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">十</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">二</span></span></strong><strong><span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">、其他</span></span></strong>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">12.1您已经仔细阅读、理解并完全同意本协议，对于存有疑问的条款已经得到金麦客的充分说明，自愿履行本协议所约定的义务并承担相应责任。</span>
</p>
<p style="text-align:right;vertical-align:baseline;background:rgb(255,255,255)">
  <span style="font-family: 宋体;font-size: 16px">&nbsp;</span>
</p>
<p style="text-align:right;vertical-align:baseline;background:rgb(255,255,255)">
  <span style="font-family: 宋体;font-size: 16px"><span style="font-family:宋体">天津</span><span style="font-family:宋体">金麦客科技有限公司</span><span style="font-family:宋体">保留所有权利。</span></span>
</p>
<p style="text-align:right;vertical-align:baseline;background:rgb(255,255,255)">
  <span style="font-family: 宋体;font-size: 16px">&nbsp;</span>
</p>
<p style="vertical-align: baseline;background: rgb(255, 255, 255)">
  <span style="font-family: 宋体;font-size: 16px">&nbsp;</span>
</p>
<p>
  <span style="font-family: 宋体;font-size: 16px">&nbsp;</span>
</p>
<p>
  <span style="font-family: 宋体;font-size: 16px">&nbsp;</span>
</p>
<p>
  <br/>
</p>`;

        this.refs.protocol.innerHTML = content;
    }

    render() {
        return (
            <div ref="protocol">{intl.get("title.payment")}</div>
        );
    }
}

const mapStateToProps = (state, ownPorps) => {
    return {
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Protocol));
