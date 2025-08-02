import { PageContext } from '@/common/lib/types';
import { pageTypes } from '@/utils/constants';
import { handleServerProps } from '@/utils/serverUtils';

const HomePage = handleServerProps(async ({ translation }: PageContext) => {
  return (
    <section>
      <h1>{translation.title}</h1>
      <p>{translation.description}</p>
    </section>
  );
}, pageTypes.HOME);

export default HomePage;
