-- Isolated-development assertions. The final exception rolls back ALL fixtures.
-- Run as one statement; P0001 / AVORA_WORKSPACE_TESTS_PASSED_ROLLED_BACK means success.
DO $test$
DECLARE student uuid:=gen_random_uuid(); objective uuid:=gen_random_uuid();
 item uuid:=gen_random_uuid(); practice uuid:=gen_random_uuid(); second uuid:=gen_random_uuid();
 stamp timestamptz; evidence integer;
BEGIN
 IF current_setting('neon.branch_id',true) IS DISTINCT FROM 'br-blue-scene-ayydvo7l' THEN
  RAISE EXCEPTION 'WRONG_BRANCH';
 END IF;
 INSERT INTO users(id,email,password_hash,full_name,role)
 VALUES(student,student::text||'@avora-test.invalid','NOT_A_LOGIN_HASH','Isolated test fixture','STUDENT');
 INSERT INTO weekly_curriculum_objectives(id,class_level,subject_name,term,week_number,topic_title,objective_text,source_reference)
 VALUES(objective,'JSS1','Mathematics',1,1,'TEST_ONLY','TEST_ONLY','TEST_FIXTURE_NOT_CURRICULUM');
 INSERT INTO weekly_items(id,objective_id,prompt,item_type,options,answer_key,explanation,difficulty,source)
 VALUES(item,objective,'TEST_ONLY','MCQ','["1","2","3","4"]','{"correct":"B"}','TEST_ONLY','RECALL','CURRICULUM_BANK');
 INSERT INTO weekly_objective_study(student_id,objective_id,study_source,studied_at)
 VALUES(student,objective,'LESSON',now()) RETURNING studied_at INTO stamp;
 INSERT INTO weekly_objective_study(student_id,objective_id,study_source,studied_at)
 VALUES(student,objective,'TEXTBOOK',NULL)
 ON CONFLICT(student_id,objective_id) DO UPDATE
 SET studied_at=COALESCE(weekly_objective_study.studied_at,EXCLUDED.studied_at);
 IF (SELECT studied_at FROM weekly_objective_study WHERE student_id=student AND objective_id=objective) IS DISTINCT FROM stamp THEN
  RAISE EXCEPTION 'STUDY_COMPLETION_LOST';
 END IF;
 BEGIN
  INSERT INTO weekly_cbt_sessions(student_id,objective_id,source,mode,item_snapshot) VALUES(student,objective,'DAILY_LESSON','PRACTICE','[]');
  RAISE EXCEPTION 'EMPTY_SNAPSHOT_ACCEPTED';
 EXCEPTION WHEN check_violation THEN NULL;
 END;
 INSERT INTO weekly_cbt_sessions(id,student_id,objective_id,source,mode,question_ids,item_snapshot)
 VALUES(practice,student,objective,'DAILY_LESSON','PRACTICE',ARRAY[item],jsonb_build_array(jsonb_build_object('id',item,'prompt','TEST_ONLY','options',jsonb_build_array('1','2','3','4'),'answer','2','explanation','TEST_ONLY')));
 BEGIN
  INSERT INTO weekly_cbt_sessions(student_id,objective_id,source,mode,question_ids,item_snapshot)
  SELECT student,objective,'DAILY_LESSON','PRACTICE',question_ids,item_snapshot FROM weekly_cbt_sessions WHERE id=practice;
  RAISE EXCEPTION 'DUPLICATE_OPEN_SESSION_ACCEPTED';
 EXCEPTION WHEN unique_violation THEN NULL;
 END;
 INSERT INTO weekly_cbt_answers(session_id,item_id,answer,is_correct) VALUES(practice,item,'2',true);
 INSERT INTO weekly_cbt_answers(session_id,item_id,answer,is_correct) VALUES(practice,item,'1',false) ON CONFLICT DO NOTHING;
 IF (SELECT count(*) FROM weekly_cbt_answers WHERE session_id=practice)<>1 OR
  NOT (SELECT is_correct FROM weekly_cbt_answers WHERE session_id=practice AND item_id=item) THEN
  RAISE EXCEPTION 'DUPLICATE_ANSWER_CHANGED_RESULT';
 END IF;
 UPDATE weekly_cbt_sessions SET submitted_at=now()-interval '1 second',correct_count=1,total_count=1 WHERE id=practice;
 INSERT INTO weekly_cbt_sessions(id,student_id,objective_id,source,mode,question_ids,item_snapshot,submitted_at,correct_count,total_count)
 SELECT second,student,objective,'DAILY_LESSON','PRACTICE',question_ids,item_snapshot,now(),1,1 FROM weekly_cbt_sessions WHERE id=practice;
 INSERT INTO weekly_cbt_answers(session_id,item_id,answer,is_correct) VALUES(second,item,'2',true);
 SELECT count(*) INTO evidence FROM (
  SELECT DISTINCT ON (a.item_id) a.item_id,a.is_correct FROM weekly_cbt_answers a
  JOIN weekly_cbt_sessions s ON s.id=a.session_id WHERE s.student_id=student AND s.objective_id=objective
   AND s.submitted_at IS NOT NULL ORDER BY a.item_id,s.submitted_at DESC,s.id DESC
 ) latest;
 IF evidence<>1 THEN RAISE EXCEPTION 'REPEATED_QUESTION_INFLATED_EVIDENCE'; END IF;
 RAISE EXCEPTION 'AVORA_WORKSPACE_TESTS_PASSED_ROLLED_BACK';
END $test$;
