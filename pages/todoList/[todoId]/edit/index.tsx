import { useRouter } from "next/router";
import TodoAddPage from "../../../../src/components/commons/units/todoAdd/toDoAdd.container";

export default function TodoPageMain() {
  const router = useRouter();
  const { todoId } = router.query;

  return (
    <>
      <div>
        <TodoAddPage isEdit={true} todoId={todoId as string} />
      </div>
    </>
  );
}
