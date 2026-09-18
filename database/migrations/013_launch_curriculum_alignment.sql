-- AVORA launch alignment: current supported learner stage is JSS1-JSS3 toward BECE.
-- Preserve learner records while removing contradictory JSS + NCEE profile combinations.
UPDATE student_profiles
SET target_exam='BECE', updated_at=now()
WHERE class_level IN ('JSS1','JSS2','JSS3') AND COALESCE(target_exam,'')<>'BECE';
