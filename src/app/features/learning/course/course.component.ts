import {Component, OnInit} from '@angular/core';
import {LearningService} from "../../../core/services/learning.service";
import {DataService} from "../../../core/services/data.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  allData: any;
  courseID: number | any;
  selectedLesson: any;
  options: any;
  fileURI = environment.fileURI;
  isComplete = false;

  constructor(private learningService: LearningService, private data: DataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.courseID = +(this.route.snapshot.paramMap.get('id') || 0);
    this.getAllData();
  }

  getAllData() {
    this.learningService.getCoursesById(this.courseID).subscribe(value => {
      this.allData = value;
      this.selectedLesson = this.allData?.course?.sections[0]?.lessons[0];
      console.log(value);
      this.CompleteCheck();
    })

  }

  resetPlayer() {
    console.log('hmm');
    this.data.resetPlayer();
  }

  markAsComplete() {
    const obj = {
      id: this.allData.id,
      courseId: this.allData.course.id,
      sectionId: this.selectedLesson.sectionId,
      lessonId: this.selectedLesson.id,
      isCompleted: true
    }
    console.log(obj);
    this.learningService.mark(obj).subscribe(value => {
      this.allData = value;
    })
  }

  getCompletedCount(id: number) {
    // @ts-ignore
    let findIndex = this.allData.sectionDatas.findIndex(item => item.sectionId == id);
    return this.allData?.sectionDatas[findIndex]?.completed || 0;
  }

  CompleteCheck() {
    // @ts-ignore
    let find = this.allData.sectionDatas.map(sec => sec.lessonDatas).reduce((prev, curr) => prev.concat(curr), []).find(item => item.lessonId == this.selectedLesson.id);
    this.isComplete =  find && find.status === 'COMPLETE';
  }
}
