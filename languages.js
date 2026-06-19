const labels = {
    en: {
        title: "Civic Social Protection Engine",
        subtitle: "Independent public utility calculating statutory metrics.",
        summaryTitle: "Analysis Summary", resourcesTitle: "Matched Demographic Resources",
        income: "Current Salary Base Amount", years: "Years of Contribution",
        microYears: "PenCom Micro Pension Tracked Years", run: "Run Engine", back: "← Back to Setup Profile"
    },
    ig: {
        title: "Injin Nchedo Ndị Oha Obodo", subtitle: "Ngwá ọrụ kwụụrụ onwe ya na-agbakọ ego nbelata iwu.",
        summaryTitle: "Nchịkọta Nnyocha", resourcesTitle: "Ihe Ndị Dị Maara Profaịlụ Gị",
        income: "Ego Inflow Kwa Ọnwa Baseline", years: "Afọ Ndị I Tinyere Ego Pensen",
        microYears: "Afọ Atụmatụ na Micro Pension Plan", run: "Gbaa Injin Ọrụ", back: "← Laghachi na Nhazi"
    },
    yo: {
        title: "Ẹrọ Àbò Àwùjọ Ará Ìlú", subtitle: "Ohun èlò tòótọ́ tíń ṣe ìṣírò àwọn owó tí òfin gé.",
        summaryTitle: "Àkópọ̀ Ìmúpọ̀", resourcesTitle: "Àwọn Ohun Àlùmọ́nì Tí Ó Bá Mu",
        income: "Iye Owó Oṣooṣù Alákọ̀ọ́bẹ̀rẹ̀", years: "Iye Ọdún Tí O Ti Sanwó Sínú Ètò",
        microYears: "Iye Ọdún Nínú Micro Pension Plan", run: "Ṣiṣẹ Ẹrọ", back: "← Padà Sínú Ìṣètò"
    },
    sn: {
        title: "Yunivhesari Civic Dziviriro Enjini", subtitle: "Chishandiso chakazvimiririra chinoverengera zvisungo zvomutemo.",
        summaryTitle: "Pfupiso Ongororo", resourcesTitle: "Zvakafanira Profile Zviwanikwa",
        income: "Mari Yepamwedzi Baseline", years: "Makore Ekupinda muChirongwa",
        microYears: "Makore Anofungidzirwa muMicro Pension", run: "Mhanyisa Enjini", back: "← Dzokera Kumashure"
    }
};

const localizedStrings = {
    en: {
        node: "Analysis Context Node", tracked: "Tracked Asset Span", years: "Years",
        cumulative: "Cumulative Modeled Asset Vault Inflow", nssa: "Aggregate NSSA Modeled Protection Value",
        ret_ok: "Met formal statutory age milestone. Pension distribution unlocked.",
        ret_later: "If you continue to contribute, this will be your pension amount, assuming you retire at age {AGE}:",
        pv_eq: "Equivalent Value in Today's Purchasing Power",
        exit_ng: "If you exit service or experience unexpected job loss right now, you are legally entitled to receive a one-time 25% lump-sum emergency drawdown release from your total RSA vault balance after 4 consecutive months out of work.",
        exit_zw: "Early withdrawal values are preserved on the NSSA registry until reaching normal retirement age. However, individuals retiring due to validated medical invalidity can claim structural emergency grants.",
        unemp_ng: "Status: Unemployed. No active baseline salary tracking. Contributors with open accounts can immediately apply for 25% emergency cash release options if accounts have been frozen for over 4 continuous months following corporate separation.",
        unemp_zw: "Informal/Unemployed Tracking. Social support safety nets fall back onto the regional Department of Social Development networks via AMTO waiver applications.",
        micro_opt: "Micro Pension Optimization Target", micro_proj: "Projected Savings Projection Vector",
        micro_exit: "Micro Pension Plan (MPP) rules allow formal contingent transfers or periodic equity access up to 50% for contingent emergencies after specified lock periods."
    },
    ig: {
        node: "Ebe Nnyocha Profaịlụ", tracked: "Oge Ntụle Ego Gị", years: "Afọ", cumulative: "Ngụkọta Ego Pensen Na-abata",
        nssa: "Ngụkọta Ego Nchedo NSSA Maka Gị", ret_ok: "Ị ruru afọ ezumike nká iwu kwadoro. E mepụtara ụzọ nkesa pensen gị.",
        ret_later: "Ọ bụrụ na ị gaa n'ihu na-enye aka, nke a ga-abụ iye ego pensen gị, na-eche na ị lara ezumike nká mgbe ị gbara afọ {AGE}:",
        pv_eq: "Ihe Ọ Ruru n'Ego Taa (Purchasing Power)",
        exit_ng: "Ọ bụrụ na ị hapụ ọrụ ma ọ bụ rụọ ọrụ ugbu a, ị nwere ikike iwu kwadoro ịnata 25% n'ego RSA gị ma ọ bụrụ na ị nweghị ọrụ ọnwa 4 sochiri anya.",
        exit_zw: "A na-echekwa ego nkwụsị ọrụ mbụ na NSSA ruo mgbe ị ruru afọ ezumike nká. Mana ndị mmadụ na-ala ezumike nká n'ihi adịghị ike ahụike nwere ike ịrịọ enyemaka mberede.",
        unemp_ng: "Ọkwa: Enweghị ọrụ. Enweghị nsochi ego ọnwa. Ndị nwere akaụntụ mepere emepe nwere ike itinye akwụkwọ AMTO maka 25% ego mberede ma ọ bụrụ na akaụntụ ha emechiela ọnwa 4 ka ha hapụchara ọrụ.",
        unemp_zw: "Nsochi Ngalaba Na-abụghị Iwu/Enweghị Ọrụ. Enyemaka nchekwa na-adabere na Ngalaba Mmepe Ndị Oha site na akwụkwọ AMTO.",
        micro_opt: "Ebumnuche Nkwalite Micro Pension", micro_proj: "Ego Atụmatụ Nchebe Onwe Gị",
        micro_exit: "Iwu Micro Pension Plan (MPP) na-enye ohere ịkwaga ego ma ọ bụ nweta ruru 50% maka ihe mberede mgbe oge ụfọdụ gachara."
    },
    yo: {
        node: "Ojú Àwòrán Atúpale", tracked: "Iye Ọdún Tí A Ṣe Ìṣírò Rẹ̀", years: "Ọdun", cumulative: "Apapọ Owo Ifẹyinti Ti O Ti Kó Jọ",
        nssa: "Apapọ Iye Àbò Owo NSSA Rẹ", ret_ok: "O ti loju ori fun ifẹyinti gẹgẹ bi òfin. Eto sisanwo owo rẹ ti ṣii.",
        ret_later: "Ti o ba tẹsiwaju lati ṣe alabapin, eyi yoo jẹ iye owo ifẹyinti rẹ, ti a ro pe o fẹyinti ni ọjọ ori {AGE}:",
        pv_eq: "Iye Tí Ó Jọ Nínú Pí pín Owo Tòní (Agbára Rira)",
        exit_ng: "Ti o ba fi iṣẹ silẹ tabi ti iṣẹ ba bọ lọwọ rẹ ni bayi, o ni ẹtọ labẹ òfin lati gba 25% owo rẹ lapapọ ti o ba wa laisi iṣẹ fun oṣù mẹ́rin tẹ̀ léra nínú RSA.",
        exit_zw: "A o tọju owo rẹ si NSSA titi o fi to ọjọ ori ifẹyinti. Ṣugbọn awọn ti o fẹyinti nitori aisan le gba iranlọwọ pajawiri.",
        unemp_ng: "Ipo: Laisi Iṣẹ. Ko si eto sisanwo oṣooṣù Alákọ̀ọ́bẹ̀rẹ̀. Awọn ti o ni akọọlẹ ti o ṣii le bere fun 25% owo pajawiri ti akọọlẹ ba ti dẹkun fun oṣù mẹ́rin lẹhin ti iṣẹ bọ lọwọ wọn.",
        unemp_zw: "Ètò Aládàáni/Laisi Iṣẹ. Iranlọwọ àbò awujọ yoo da lori Ọfisi Idagbasoke Awujọ nipasẹ awọn ohun elo AMTO.",
        micro_opt: "Ètò Micro Pension (MPP) Ti O Kó Jọ", micro_proj: "Owó Ifidámọ́rán Alágbàwí Alákọ̀ọ́bẹ̀rẹ̀",
        micro_exit: "Awọn òfin Ètò Micro Pension (MPP) gba laaye lati gbe owo tabi gba to 50% fun awọn pajawiri lẹhin akoko titiipa pato."
    },
    sn: {
        node: "Nzvimbo dzekuongorora Profile", tracked: "Makore Ekutarisa Midziyo", years: "Makore", cumulative: "Mari yeMudyandigere Yakachengetwa",
        nssa: "Mari yeNSSA Yakasanganiswa Dziviriro", ret_ok: "Zera rekurera zviri pamutemo rasvikwa. Mudyandigere wavhurwa.",
        ret_later: "Kana ukaramba uchibhadhara, iyi ndiyo ichava mari yako yemudyandigere, uchifungidzira kuti uchatandara pazera remakore {AGE}:",
        pv_eq: "Mari Inofananidzwa neSimba reKutenga reNhasi",
        exit_ng: "Kana ukasiya basa kana kurasikirwa nebasa parizvino, une kodzero yepamutemo yekugamuchira 25% yemari yako yeRSA mushure memwedzi mina yakatevedzana usina basa.",
        exit_zw: "Mari yekubvisa mangwanani inochengetwa muNSSA kusvika wasvika zera rekurega basa. Nekudaro, vanhu vanorega basa nekuda kwekurwara vanogona kuwana rubatsiro rwekukurumidza.",
        unemp_ng: "Mamiriro: Hauna Basa. Ko si nhoroondo yemari yepamwedzi. Vanhu vane maakaundi akavhurwa vanogona kukumbira 25% yemari yekukurumidza kana akaundi yakamiswa mwedzi mina inotevedzana.",
        unemp_zw: "Kutarisa Kwasara/Kusina Basa. Rubatsiro rwemagariro runodzokera kuBazi rekuVandudzwa kweMagariro kuburikidza neAMTO.",
        micro_opt: "Micro Pension Inotarisirwa Target", micro_proj: "Mari Inofungidzirwa muMicro Pension",
        micro_exit: "Mitemo yeMicro Pension (MPP) inobvumidza kuendesa imwe mari kana kuwana kusvika 50% yemari yekukurumidza."
    }
};
