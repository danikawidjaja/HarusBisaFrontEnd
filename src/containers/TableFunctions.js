

	const range = (len) => {
		const arr = [];
		for (let i=0; i<len; i++){
			arr.push(i);
		}
		return arr;
	};

	const newEntry = (lecture_date, lecture_accuracy) =>{
		return {
			date: lecture_date,
			accuracy: lecture_accuracy,
		}
	}

export function makeData(){
	const lectures =[{date: '10/1', acc: 100}, {date:'9/2', acc:50}];
	let len = lectures.length
		return range(len, lectures).map(d => {
				return {
					...newEntry(lectures[1].date, lectures[1].acc),
					children: range(10).map(newEntry)
				};
		});
	}