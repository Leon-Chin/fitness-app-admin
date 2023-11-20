import { Tag } from "antd"

const TutorialDetailItem = (detailLabel, selectedTutorial) => {
    return [
        {
            key: '1',
            label: detailLabel.name,
            span: 2,
            children: selectedTutorial?.name,
        },
        {
            key: '2',
            label: detailLabel.zh_name,
            span: 2,
            children: selectedTutorial?.zh_name,
        },
        {
            key: '3',
            label: detailLabel.type,
            span: 2,
            children: <Tag>{selectedTutorial?.type}</Tag>,
        },
        {
            key: '4',
            span: 2,
            label: detailLabel.participant,
            children: selectedTutorial?.participant,
        },
        {
            key: '5',
            label: detailLabel.createdAt,
            span: 2,
            children: selectedTutorial?.createdAt/*'2019-04-24 18:00:00'*/,
        },
        {
            key: '6',
            label: detailLabel.updatedAt,
            span: 2,
            children: selectedTutorial?.updatedAt/*'2019-04-24 18:00:00'*/,
        },
        {
            key: '7',
            label: detailLabel.brief,
            span: 2,
            children: selectedTutorial?.brief,
        },
        {
            key: '8',
            label: detailLabel.zh_brief,
            span: 2,
            children: selectedTutorial?.zh_brief,
        },
        {
            key: '9',
            label: detailLabel.description,
            span: 2,
            children: (
                <>
                    {selectedTutorial?.description}
                </>
            ),
        },
        {
            key: '10',
            label: detailLabel.zh_description,
            span: 2,
            children: (
                <>
                    {selectedTutorial?.zh_description}
                </>
            ),
        },
        {
            key: '11',
            label: detailLabel.level,
            span: 2,
            children: (
                <>
                    {selectedTutorial?.level}
                </>
            ),
        },
        {
            key: '12',
            label: detailLabel.equipments,
            span: 2,
            children: (
                <>
                    {selectedTutorial?.equipments.map(item => <Tag>{item}</Tag>)}
                </>
            ),
        },
        {
            key: '13',
            span: 3,
            label: detailLabel.colorie,
            children: <>{selectedTutorial?.lowerEstimateColorie}~{selectedTutorial?.higherEstimateColorie}</>,
        },
        {
            key: '14',
            label: detailLabel.cover,
            span: 3,
            children: <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <a href={selectedTutorial?.cover}>{selectedTutorial?.cover}</a>
            </div>
        },
        {
            key: '15',
            label: detailLabel.video,
            span: 3,
            children: <a href={selectedTutorial?.video}>{selectedTutorial?.video}</a>/*'2019-04-24 18:00:00'*/,
        },
    ]
}
export default TutorialDetailItem