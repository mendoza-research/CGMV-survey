import Layout from "components/Layout";
import styles from "components/exit-survey/exit-survey.module.scss";
import useSurveyStore from "stores/useSurveyStore";
import { useForm } from "react-hook-form";
import usePageNavigation from "hooks/usePageNavigation";
import { useMutation } from "@apollo/client";
import { RECORD_SECOND_EXIT_SURVEY_QUERY } from "utils/gql-queries";
import { useEffect, useState } from "react";
import { GamificationEnum } from "typings/survey";
import { quickFadeInOutVariants } from "survey-settings";
import { AnimationEnum } from "typings/animation";
import AnimationBox from "components/animations/AnimationBox";
import ErrorMessageBox from "components/questions/ErrorMessageBox";
import { motion, AnimatePresence } from "framer-motion";
import { getAnimationDuration } from "utils/animation";

interface IExitSurveyFormData {
  used_robinhood: boolean;
  used_acorns: boolean;
  used_public: boolean;
  used_webull: boolean;
  used_sofi: boolean;
  used_ally_invest: boolean;
  used_other: boolean;
  other_platform: string;
  never_used: boolean;
  invested_in_stock: number;
  investing_knowledge: number;
  plan_to_invest: number;
  num_accy_courses: number;
  num_fin_courses: number;
  english_first_language: number;
  other_first_language: string;
  age: number;
  gender: number;
  gender_self_describe: string;
}

const animation = AnimationEnum.FIREWORKS;

export default function PlatformQuestionsPage() {
  const sessionId = useSurveyStore((state) => state.sessionId);
  const gamification = useSurveyStore((state) => state.gamification);
  const { toNext } = usePageNavigation({
    nextPathname: "/optional-game",
  });
  const [isPageExiting, setIsPageExiting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<IExitSurveyFormData>({
    reValidateMode: "onChange",
  });

  const other_platform = register("other_platform");
  const other_first_language = register("other_first_language");
  const gender_self_describe = register("gender_self_describe");

  const watchData = watch();

  useEffect(() => {
    const isAnyPlatformSelected = [
      watchData.used_robinhood,
      watchData.used_acorns,
      watchData.used_public,
      watchData.used_webull,
      watchData.used_sofi,
      watchData.used_ally_invest,
      watchData.used_other,
    ].some((v) => !!v);

    if (isAnyPlatformSelected) {
      setValue("never_used", false);
      trigger("never_used");
    }
  }, [
    watchData.used_robinhood,
    watchData.used_acorns,
    watchData.used_public,
    watchData.used_webull,
    watchData.used_sofi,
    watchData.used_ally_invest,
    watchData.used_other,
  ]);

  useEffect(() => {
    const fields = [
      "used_robinhood",
      "used_acorns",
      "used_public",
      "used_webull",
      "used_sofi",
      "used_ally_invest",
      "used_other",
    ];

    if (watchData.never_used) {
      fields.forEach((field) => {
        setValue(field as any, false);
      });
    }

    trigger("used_other");
  }, [watchData.never_used]);

  const validateUsedPlatform = (never_used: boolean) => {
    if (
      [
        watchData.used_robinhood,
        watchData.used_acorns,
        watchData.used_public,
        watchData.used_webull,
        watchData.used_sofi,
        watchData.used_ally_invest,
        watchData.used_other,
        never_used,
      ].every((v) => !v)
    ) {
      return false;
    }

    return true;
  };

  const validateUsedOtherPlatform = (v: any) => {
    if (
      watchData.used_other &&
      (!watchData.other_platform || watchData.other_platform.trim() === "")
    ) {
      return false;
    }

    return true;
  };

  const validateEnglishFirstLanguage = (v: number) => {
    v = Number(v);

    if (
      v === 0 &&
      (!watchData.other_first_language ||
        watchData.other_first_language.trim() === "")
    ) {
      return false;
    }

    return true;
  };

  const validateGender = (v: number) => {
    v = Number(v);

    if (
      v === 4 &&
      (!watchData.gender_self_describe ||
        watchData.gender_self_describe.trim() === "")
    ) {
      return false;
    }

    return true;
  };

  const [recordSecondExitSurveyQuestionsToDb] = useMutation(
    RECORD_SECOND_EXIT_SURVEY_QUERY
  );

  const onSubmit = async (data) => {
    await recordSecondExitSurveyQuestionsToDb({
      variables: {
        session_id: sessionId,
        used_robinhood: Number(data["used_robinhood"]),
        used_acorns: Number(data["used_acorns"]),
        used_public: Number(data["used_public"]),
        used_webull: Number(data["used_webull"]),
        used_sofi: Number(data["used_sofi"]),
        used_ally_invest: Number(data["used_ally_invest"]),
        used_other: Number(data["used_other"]),
        other_platform: data["other_platform"],
        never_used: Number(data["never_used"]),
        invested_in_stock: data["invested_in_stock"],
        investing_knowledge: data["investing_knowledge"],
        plan_to_invest: data["plan_to_invest"],
        num_accy_courses: Number(data["num_accy_courses"]),
        num_fin_courses: Number(data["num_fin_courses"]),
        english_first_language: data["english_first_language"],
        other_first_language: data["other_first_language"],
        age: data["age"],
        gender: data["gender"],
        gender_self_describe: data["gender_self_describe"],
      },
    });

    const animationDuration = getAnimationDuration(animation);

    if (gamification === GamificationEnum.GAMIFICATION) {
      setIsAnimating(true);

      // Start page exit animation after animationDuration milliseconds
      setTimeout(() => {
        setIsPageExiting(true);
      }, animationDuration);

      await new Promise((resolve) =>
        setTimeout(resolve, animationDuration + 300)
      );
    } else {
      setIsPageExiting(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    toNext();
  };

  return (
    <Layout>
      <AnimatePresence>
        {!isPageExiting && (
          <motion.main
            key="main"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={quickFadeInOutVariants}
            className={styles.exitSurvey}
          >
            {isAnimating && (
              <div className={styles.animationWrapper}>
                <AnimationBox animation={animation} />
              </div>
            )}
            <p>
              The following questions are included for the purpose of
              understanding the group of study participants as a whole.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.questionWrapper}>
                <p>
                  Have you ever used any of the following investment platforms?
                  (Select all that apply)
                </p>

                <div className={styles.optionsWrapper}>
                  <label>
                    <input
                      type="checkbox"
                      placeholder="used_robinhood"
                      {...register("used_robinhood")}
                    />
                    <span className={styles.labelText}>Robinhood</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      placeholder="used_acorns"
                      {...register("used_acorns")}
                    />
                    <span className={styles.labelText}>Acorns</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      placeholder="used_public"
                      {...register("used_public")}
                    />
                    <span className={styles.labelText}>Public</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      placeholder="used_webull"
                      {...register("used_webull")}
                    />
                    <span className={styles.labelText}>Webull</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      placeholder="used_sofi"
                      {...register("used_sofi")}
                    />
                    <span className={styles.labelText}>Sofi</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      placeholder="used_ally_invest"
                      {...register("used_ally_invest")}
                    />
                    <span className={styles.labelText}>Ally Invest</span>
                  </label>
                  <label className={styles.label}>
                    <input
                      type="checkbox"
                      placeholder="used_other"
                      {...register("used_other", {
                        validate: validateUsedOtherPlatform,
                      })}
                    />

                    <div className={styles.innerLabel}>
                      <span className={styles.labelText}>Other:</span>
                      <input
                        onFocus={() => {
                          setValue("used_other", true);
                        }}
                        type="text"
                        onChange={(e) => {
                          setValue("other_platform", e.target.value);
                          other_platform.onChange(e);
                        }}
                        onBlur={(e) => {
                          trigger("used_other");
                          other_platform.onBlur(e);
                        }}
                        ref={other_platform.ref}
                      />
                    </div>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      placeholder="never_used"
                      {...register("never_used", {
                        validate: validateUsedPlatform,
                      })}
                    />
                    <span className={styles.labelText}>
                      I have never used an investment platform.
                    </span>
                  </label>
                </div>

                {errors.used_other?.type === "validate" && (
                  <ErrorMessageBox message="Please enter the other platform(s) you have used." />
                )}
                {errors.never_used?.type === "validate" && <ErrorMessageBox />}
              </div>

              <div className={styles.questionWrapper}>
                <p>
                  Have you ever invested money in the stock market? (e.g.,
                  stock, mutual fund, exchanged-traded fund, index fund, etc.)
                </p>
                <div className={styles.optionsWrapper}>
                  <label>
                    <input
                      {...register("invested_in_stock", { required: true })}
                      type="radio"
                      value="1"
                    />
                    <span className={styles.labelText}>Yes</span>
                  </label>
                  <label>
                    <input
                      {...register("invested_in_stock", { required: true })}
                      type="radio"
                      value="0"
                    />
                    <span className={styles.labelText}>No</span>
                  </label>
                </div>
                {errors.invested_in_stock && <ErrorMessageBox />}
              </div>

              <div className={styles.questionWrapper}>
                <p>I would describe my knowledge of investing as:</p>
                <div className={styles.optionsWrapper}>
                  <label>
                    <input
                      {...register("investing_knowledge", { required: true })}
                      type="radio"
                      value="1"
                    />
                    <span className={styles.labelText}>Non-existent</span>
                  </label>
                  <label>
                    <input
                      {...register("investing_knowledge", { required: true })}
                      type="radio"
                      value="2"
                    />
                    <span className={styles.labelText}>Limited</span>
                  </label>
                  <label>
                    <input
                      {...register("investing_knowledge", { required: true })}
                      type="radio"
                      value="3"
                    />
                    <span className={styles.labelText}>Good</span>
                  </label>
                  <label>
                    <input
                      {...register("investing_knowledge", { required: true })}
                      type="radio"
                      value="4"
                    />
                    <span className={styles.labelText}>Extensive</span>
                  </label>
                </div>

                {errors.investing_knowledge && <ErrorMessageBox />}
              </div>

              <div className={styles.questionWrapper}>
                <p>
                  Do you <span className="underline">plan to</span> invest money
                  in the stock market within the next 5 years?
                </p>
                <div className={styles.optionsWrapper}>
                  <label>
                    <input
                      {...register("plan_to_invest", { required: true })}
                      type="radio"
                      value="1"
                    />
                    <span className={styles.labelText}>Yes</span>
                  </label>
                  <label>
                    <input
                      {...register("plan_to_invest", { required: true })}
                      type="radio"
                      value="0"
                    />
                    <span className={styles.labelText}>No</span>
                  </label>
                </div>

                {errors.plan_to_invest && <ErrorMessageBox />}
              </div>

              <div className={styles.questionWrapper}>
                <p>
                  How many undergraduate or graduate accounting and finance
                  courses have you taken, including any in which you are
                  currently enrolled?
                </p>
                <div className={styles.optionsWrapper}>
                  <div className={styles.label}>
                    <input
                      type="checkbox"
                      checked={watchData.num_accy_courses > 0}
                      disabled
                    />

                    <label className={styles.innerLabel}>
                      <span className={styles.labelText}>
                        Accounting Classes (#)
                      </span>
                      <input
                        type="number"
                        placeholder="Number here..."
                        {...register("num_accy_courses", { min: 0 })}
                      />
                    </label>
                  </div>
                  <div className={styles.label}>
                    <input
                      type="checkbox"
                      checked={watchData.num_fin_courses > 0}
                      disabled
                    />

                    <label className={styles.innerLabel}>
                      <span className={styles.labelText}>
                        Finance Classes (#)
                      </span>
                      <input
                        type="number"
                        placeholder="Number here..."
                        {...register("num_fin_courses", { min: 0 })}
                      />
                    </label>
                  </div>
                </div>

                {errors.num_accy_courses && (
                  <ErrorMessageBox message="Number of Accounting classes cannot be negative." />
                )}
                {errors.num_fin_courses && (
                  <ErrorMessageBox message="Number of Finance classes cannot be negative." />
                )}
              </div>

              <div className={styles.questionWrapper}>
                <p>
                  Which of the following best describes your first language?
                </p>
                <div className={styles.optionsWrapper}>
                  <label>
                    <input
                      {...register("english_first_language", {
                        required: true,
                        validate: validateEnglishFirstLanguage,
                      })}
                      type="radio"
                      value="1"
                    />
                    <span className={styles.labelText}>
                      English is my first language.
                    </span>
                  </label>

                  <label>
                    <input
                      {...register("english_first_language", {
                        required: true,
                        validate: validateEnglishFirstLanguage,
                      })}
                      type="radio"
                      value="0"
                    />
                    <div className={styles.innerLabel}>
                      <span className={styles.labelText}>
                        English is not my first language. My first language is:
                      </span>
                      <input
                        onFocus={() => {
                          setValue("english_first_language", "0" as any);
                        }}
                        type="text"
                        onChange={(e) => {
                          setValue("other_first_language", e.target.value);
                          other_first_language.onChange(e);
                        }}
                        onBlur={(e) => {
                          trigger("english_first_language");
                          other_first_language.onBlur(e);
                        }}
                        ref={other_first_language.ref}
                      />
                    </div>
                  </label>
                </div>

                {errors.english_first_language?.type === "required" && (
                  <ErrorMessageBox />
                )}
                {errors.english_first_language?.type === "validate" && (
                  <ErrorMessageBox message="You must specify another first language if you select the second option." />
                )}
              </div>

              <div className={styles.questionWrapper}>
                <p>What is your current age?</p>
                <div className={styles.optionsWrapper}>
                  <div className={styles.label}>
                    <input type="checkbox" checked={!!watchData.age} disabled />
                    <label className={styles.innerLabel}>
                      <span className={styles.labelText}>Years: </span>
                      <input
                        type="number"
                        placeholder="Type here..."
                        {...register("age", { min: 0, required: true })}
                      />
                    </label>
                  </div>
                </div>
                {errors.age?.type === "required" && <ErrorMessageBox />}
                {errors.age?.type === "min" && (
                  <ErrorMessageBox message="Age cannot be a negative number." />
                )}
              </div>

              <div className={styles.questionWrapper}>
                <p>What best describes your gender?</p>
                <div className={styles.optionsWrapper}>
                  <label>
                    <input
                      {...register("gender", {
                        required: true,
                        validate: validateGender,
                      })}
                      type="radio"
                      value="0"
                    />
                    <span className={styles.labelText}>Male</span>
                  </label>
                  <label>
                    <input
                      {...register("gender", {
                        required: true,
                        validate: validateGender,
                      })}
                      type="radio"
                      value="1"
                    />
                    <span className={styles.labelText}>Female</span>
                  </label>
                  <label>
                    <input
                      {...register("gender", {
                        required: true,
                        validate: validateGender,
                      })}
                      type="radio"
                      value="2"
                    />
                    <span className={styles.labelText}>
                      Prefer not to answer
                    </span>
                  </label>
                  <label>
                    <input
                      {...register("gender", {
                        required: true,
                        validate: validateGender,
                      })}
                      type="radio"
                      value="4"
                    />

                    <div className={styles.innerLabel}>
                      <span className={styles.labelText}>
                        Prefer to self-describe:
                      </span>
                      <input
                        onFocus={() => {
                          setValue("gender", "4" as any);
                        }}
                        type="text"
                        onChange={(e) => {
                          setValue("gender_self_describe", e.target.value);
                          gender_self_describe.onChange(e);
                        }}
                        onBlur={(e) => {
                          trigger("gender");
                          gender_self_describe.onBlur(e);
                        }}
                        ref={gender_self_describe.ref}
                      />
                    </div>
                  </label>
                </div>

                {errors.gender?.type === "required" && <ErrorMessageBox />}
                {errors.gender?.type === "validate" && (
                  <ErrorMessageBox message="You must specify a gender if you select this option." />
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "40px",
                }}
              >
                <input type="submit" className="button" value="Next" />
              </div>
            </form>
          </motion.main>
        )}
      </AnimatePresence>
    </Layout>
  );
}
