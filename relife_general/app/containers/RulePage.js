import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import I18nUtils from '../utils/I18nUtils'
import {Container, Row, Col} from 'reactstrap'

class RulePage extends React.Component {
    render() {
        return (
            <Container fluid className="lower-contents one-column">
                <Row className="lower-contents-inner clearfix">
                    <Col xs="12" md="12" className="padding-0">
                        <section className="main">
                            <div className="single-title">
                                {I18nUtils.t('rule-page-title')}
                            </div>
                            <section className="single-content">
                                <h2 className="single-subtitle">第1条（規約の適用）</h2>
                                <p>
                                    本規約は、株式会社ランウェイ（以下、「当社」という）が運営・提供する全てのポータルサイト、ウェブメディア及び各種ウェブサービス並びにそれらに付随する全てのサービス（総称して以下、「本サービス」という）の利用条件を定めるものです。
                                    <br />
                                    本サービスの申込者及び利用者（以下、単に「利用者」という）は本規約の内容に全て同意した上で本サービスを申し込み、利用するものとします。
                                </p>
                                <h2 className="single-subtitle">第2条（定義）</h2>
                                <p>本契約とは、本サービスの利用に伴い、利用者と当社との間で合意した内容及び本規約の定めるところにより、利用者と当社間で締結される本サービスの利用に関する契約を意味します。
                                    利用者情報とは、利用者の氏名又は名称、事務所名（店舗名）、住所、電話番号等の本サービスの利用に必要な情報を意味します。
                                    利用料金等とは、本サービスの申込み及び利用に関して、利用者から当社に対して支払われる一切の対価を意味します。
                                </p>
                                <h2 className="single-subtitle">第3条（サービスの申込み）</h2>
                                <p>利用者は、本サービスの利用にあたり、当社が定める方式によりサービスの利用申込を行うものとします。
                                    利用者は、本サービスの利用申込にあたり、次の事項を表明し、保証します。
                                </p>
                                <ol>
                                    <li>本サービスの利用申込にあたり利用者が当社に対して提供した事実及び情報は、完全且つ正確であること</li>
                                    <li>利用者による本サービスの申込み及び利用が、直接的又は間接的かを問わず、第三者のいかなる権利も侵害しないこと</li>
                                    <li>本サービスの申込み及び利用にあたり、不法又は不正な目的又は意図をもっていないこと</li>
                                    <li>利用者並びにその役員及び従業員、並びに、これらの親族が現在又は将来にわたって反社会的勢力（暴力団、暴力団員、暴力団員でなくなったときから5年を経過しない者、暴力団準構成員、暴力団関係企業、総会屋等、社会運動等標ぼうゴロ又は特殊知能暴力集団等、その他これらに準ずる者をいいます）に該当せず、また、反社会的勢力と一切の関係を有しないこと、並びに、当社（提携先等も含みます）に対して、暴力的行為、詐術・脅迫行為、業務妨害行為等の違法行為を行わないこと</li>
                                    <li>利用者が法人の場合、利用者は、利用申込を行う担当者及び申込書に記載する担当者が本サービスの利用申込を行う権限を有する者であり、且つ必要な内部手続は全て履践されていること
                                        利用者が本サービスの利用申込をし、当社がそれを承諾した時点で、本契約締結となります。
                                    </li>
                                </ol>
                                <h2 className="single-subtitle">第4条（審査）</h2>
                                <p>当社は、本サービスの利用申込を受領した場合には、次の基準により審査するものとし、当該利用申込を承諾する場合には、その旨を利用者に伝えた上で、本サービスの利用に必要な書類の送付その他の必要な手続を行うものとします。</p>
                                <ol>
                                    <li>利用者が本サービスの利用者として適切であるか否か</li>
                                    <li>利用者が当社所定の決済手段を利用できるか否か</li>
                                    <li>利用者が本サービスへの掲載を求めた利用者情報が適切であるか否か</li>
                                    <li>利用者が申込みの際に当社に提供した情報、又は、第3条第2項に基づく申込時の表明保証に誤りや違反があるか否か</li>
                                    <li>利用者が本サービスに関する利用料金等の支払を現に怠っている、又は、過去に怠ったことがあるか否か</li>
                                    <li>利用者が本サービスにおいて、過去に第11条第2項各号に該当すること等を理由に本サービスの提供を停止され、又は、本契約を解除されたことがあるか否か</li>
                                    <li>その他本サービスを提供することが適切であるか否か</li>
                                </ol>
                                <p>当社は、審査の内容、判断理由等に関して、何ら開示の義務を負わないものとします。</p>
                                <h2 className="single-subtitle">第5条（本サービスの利用）</h2>
                                <p>利用者は、本サービスの利用に際し、当社との間で別途の合意が存在する場合を除き、本規約を遵守するものとします。
                                    当社は、本サービスの利用により、一定期間における一定の成果を保証するものではなく、利用者は、本サービスの利用後、当該成果が得られなかった場合であっても、当社に異議を申し出ることはできないものとし、当社は、利用料金等の返還は致しません。
                                    当社は、本規約及び本サービスの利用条件を、当社の判断により利用者の事前の承認を得ることなく変更できるものとし、利用者は、当該変更の時点で、変更後の本規約の内容及び本サービスの利用条件が本契約に組み入れられることに同意します。その際は電子メールの送信又は書面の送付等、当社が適切と認める方法により通知するものとします。
                                </p>
                                <h2 className="single-subtitle">第6条（本サービスの変更）</h2>
                                <p>当社は、本サービスの内容を、当社の判断により利用者の事前の承認を得ることなく変更できるものとし、利用者は、当該変更の時点で、変更後の本サービスの内容が本契約に組み入れられることに同意します。その際は電子メールの送信又は書面の送付等、当社が適切と認める方法により通知するものとします。
                                    本サービスに掲載された利用者情報の変更に関しては、本契約締結後、利用者からの要請を受けて、当社が審査を実施し、変更内容が適切であると当社が判断した場合に限り、当社が定める手続（有償となる可能性があります）に従って行うことができるものとします。
                                </p>
                                <h2 className="single-subtitle">第7条（利用料金等）</h2>
                                <p>利用者は、本契約締結後、当社との間で合意した額の利用料金等を、支払期限までに支払うものとします。なお、利用料金等に賦課される消費税及び地方税は、利用者が負担するものとします。
                                    本契約が更新される場合には、利用者は、更新毎に、当社との間で合意した額の利用料金等を支払うものとします。
                                    前2項の利用料金等は、利用申込の際に利用者と当社との間で合意した支払方法により支払われるものとします。
                                </p>
                                <h2 className="single-subtitle">第8条（遅延損害金）</h2>
                                <p>利用者が、本サービスの利用料金等を、別途定める支払期限を経過してもなお支払わない場合には、当社は、本サービスの提供を停止できるものとし、利用者は、支払期限の翌日から支払日までの期間について、年14.5%の割合による遅延損害金を支払うものとします。</p>
                                <h2 className="single-subtitle">第9条（利用者情報の変更）</h2>
                                <p>利用者は、当社に届け出た利用者情報に変更があったときは、速やかに当社に対して届け出るものとします。
                                    前項の届出が遅延したこと、又は届出を怠ったことにより、当社からの通知が到達しない等の不利益を利用者が被った場合においても、当社は一切責任を負わないものとし、当社からの通知は通常到達すべきときに利用者に到達したものとみなします。
                                    利用者は、第1項の届出が遅延した場合、又は、届出を怠った場合、当社が自己の判断により、本サービスの提供を停止する場合があることに同意し、当該停止により利用者が不利益を被った場合においても、当社は一切責任を負わないものとします。
                                </p>
                                <h2 className="single-subtitle">第10条（利用者による本サービスの解除、中途解約）</h2>
                                <p>利用者は、本契約の締結後、利用者の都合により、第12条に定める有効期間中に本契約を解除及び解約することができず、当社は、支払済みの利用料金等について、一切の返金を行わないものとします。</p>
                                <h2 className="single-subtitle">第11条（当社による本サービスの停止・解除）</h2>
                                <p>利用者は、本規約及び法令等の定めを遵守するものとします。
                                    当社は、利用者が次の各号の行為を行ったと判断した場合、何らの催告、通知をせずに、利用者に対する本サービスの全部又は一部の提供の停止、本契約の解除その他当社が適切と判断する一切の措置をとることができるものとし、利用者はこれに同意します。これにより利用者に損害、損失又は不利益が生じたとしても、当社は一切の責任を負わないものとします。本項により本サービスの全部又は一部の提供の停止、本契約の解除等が行われた場合であっても、利用者は、利用料金等の全額を支払わなければならず、当社は、一切の返金を行わないものとします。
                                </p>
                                <ol>
                                    <li>本契約及び本規約に違反する行為</li>
                                    <li>本サービスを第三者に当社の事前の許可なく営利目的で使用させる行為</li>
                                    <li>本サービス利用に際して、当社に対して虚偽の情報を提供する行為</li>
                                    <li>第三者のプライバシー又は営業秘密、名誉等を侵害し、又は侵害する可能性がある行為</li>
                                    <li>第三者の著作権その他の知的財産権を侵害し、又は侵害する可能性がある行為</li>
                                    <li>法令又は利用者が所属する業界団体の内部規則に違反する行為</li>
                                    <li>公序良俗に反する行為</li>
                                    <li>他者を差別又は誹謗中傷する行為</li>
                                    <li>他者に経済的又は精神的な損害を与える行為</li>
                                    <li>当社又は第三者になりすます行為、及び、当社又は第三者との提携又は協力関係の有無を偽る行為</li>
                                    <li>猥褻又は暴力的なメッセージ、画像、映像、音声等を送信、掲示又は発信する行為</li>
                                    <li>反社会的勢力又は反社会的活動に関する行為</li>
                                    <li>当社によって承認されていない勧誘、営業、広告又は宣伝活動</li>
                                    <li>第三者の個人情報を収集又は蓄積する行為、及び、第三者の各種設備を害するウィルスプログラム等を開示、掲載、送信又は頒布する行為</li>
                                    <li>前各号の行為を試みる行為、前各号に類する行為、前各号に該当する恐れのある行為その他当社が利用者による本サービスの利用が不適切であると判断した行為</li>
                                </ol>
                                <h2 className="single-subtitle">第12条（本契約の有効期間）</h2>
                                <p>本契約の有効期間は、本契約締結日から、利用者と当社との間で別途定める契約期間が満了する日までとします。また、契約期間満了日までの1ヶ月前までに、当社から契約更新の有無について確認を行うものとします。</p>
                                <h2 className="single-subtitle">第13条（譲渡の禁止）</h2>
                                <p>利用者は、当社の書面による事前の同意なく、本契約上の地位その他本サービスに関するいかなる権利又は義務についても第三者に譲渡、移転、担保設定その他一切の処分（有償無償を問いません）をしてはならないものとします。</p>
                                <h2 className="single-subtitle">第14条（免責）</h2>
                                <p>当社は、本サービスの利用又はそれに関連して発生した利用者の損害、損失又は不利益について、当社の故意又は重過失が無い限り、直接的又は間接的な損害を問わず、一切の責任を負わないものとします。
                                    通常講ずるべき対策では防止できない通信回線の故障、システムの故障、天災地変、その他当社の責めに帰することのできない事由により、利用者に損害、損失又は不利益が生じたとしても、当社は一切の責任を負わないものとします。
                                    利用者が、本サービス開始のために必要な商品・情報等を当社指定の日時に準備できないことにより、本サービス開始に遅延が生じ、利用者に損害、損失又は不利益が生じたとしても、当社は一切の責任を負わないものとします。
                                    当社は、本サービスを通じて利用者が掲載した利用者情報、及び、利用者が行った行為に関して、一切の責任を負わないものとし、利用者は、利用者相互間及び利用者と第三者との間で生じた紛争及びトラブルに関しては、自己の責任と費用により解決するとともに、当社を免責し、当社に損害を与えた場合には、当該損害を賠償する義務を負うものとします。
                                </p>
                                <h2 className="single-subtitle">第15条（機密保持）</h2>
                                <p>利用者は、本サービス及び本契約の内容その他これらに関する一切の事項について第三者へ口外してはならないものとし、第三者に口外しようとする場合には、事前に当社の書面による同意を得て、これを行うものとします。</p>
                                <h2 className="single-subtitle">第16条（サービスの提供中止）</h2>
                                <p>当社は、次の各号のいずれかに該当する場合、本サービスの機能の全部又は一部の提供を一時的に中止することがあり、利用者はこれに同意します。これにより利用者に損害、損失又は不利益が生じたとしても、当社は一切の責任を負わないものとします。本項により本サービスの機能の全部又は一部の提供の一時的な中止が行われた場合であっても、利用者は、利用料金等の全額を支払わなければならず、当社は、一切の返金を行わないものとします。</p>
                                <ol>
                                    <li>当社の設備の保守、工事、法定点検、又は障害等やむを得ないとき</li>
                                    <li>電気通信サービスの停止等により本サービスの機能の提供を行うことが困難になったとき</li>
                                    <li>当社の設備を不正アクセス行為から防御するために必要なとき</li>
                                    <li>災害の予防若しくは救援、交通、通信若しくは電力の供給の確保、又は、秩序の維持に必要な通信その他の公共の利益のために緊急を要するとき</li>
                                    <li>その他、当社が本サービスの機能の全部又は一部を中止することが望ましいと判断したとき</li>
                                </ol>
                                <p>当社は、第１項に基づき本サービスの機能の全部又は一部の提供を中止する場合は、利用者に対し、その旨とサービス提供中止の期間を事前に通知します。ただし、緊急やむを得ない場合はこの限りではありません。</p>
                                <h2 className="single-subtitle">第17条（損害賠償）</h2>
                                <p>利用者は、本サービスの利用に際して、その責に帰すべき事由により、当社に損害を与えたときは、その損害を賠償するものとします。当該損害には、利用者と第三者との紛争に関し、本サービス運営機関が被った被害を含むものとします。
                                    当社は、本サービスの利用に関して、当社の故意又は重過失により利用者に損害が発生した場合に限り、その直接且つ通常の損害を賠償するものとします。また、賠償金額は当社が利用者より受領した当該サービスに関する利用料金等を上限とします。
                                </p>
                                <h2 className="single-subtitle">第18条（再委託）</h2>
                                <p>当社は、本サービスの提供業務の全部又は一部につき、当社の責任において第三者に再委託することができるものとします。</p>
                                <h2 className="single-subtitle">第19条（分離条項）</h2>
                                <p>本規約に定めるいずれかの条項が管轄権のある裁判所により無効である旨判断された場合には、かかる条項は、法律が許容する限りで、本来の条項の趣旨を最大限実現するように変更又は解釈されるものとし、また、本規約の他の条項の効力には何らの影響を与えないものとします。</p>
                                <h2 className="single-subtitle">第20条（協議事項）</h2>
                                <p>利用者及び当社は、本規約又は本契約に関して疑義が生じた場合及び本規約又は本契約に定めのない事項については、まず第一に誠実に協議の上、解決するものとします。</p>
                                <h2 className="single-subtitle">第21条（準拠法）</h2>
                                <p>本規約は、日本法を準拠法とし、同法に基づいて解釈されます。</p>
                                <h2 className="single-subtitle">第22条（管轄裁判所）</h2>
                                <p>当社と利用者との間で、本サービスの利用に起因又は関連して生じた一切の訴訟その他の紛争は、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
                            </section>
                        </section>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect()(withRouter(RulePage))
