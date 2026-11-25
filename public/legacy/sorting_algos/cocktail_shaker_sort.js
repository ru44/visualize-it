let left_sorted_index_c, right_sorted_index_c;
let scanning_index_c;

let num_interest_c, num_position_c;

let state_c;

function updateCocktail() {
    if(left_sorted_index_c < right_sorted_index_c) {
        if(state_c == "max") {
            // Forward pass: bubble the largest unsorted value to the right
            if(scanning_index_c < right_sorted_index_c) {
                num_position_c = scanning_index_c + 1; // other element of the compared pair

                if(array[scanning_index_c] > array[scanning_index_c + 1]) {
                    swap(scanning_index_c, scanning_index_c + 1);
                    swapped_c = true;
                    swaps++;
                }
                scanning_index_c++;

                comparisons++;
                array_access += 2;
            }
            else {
                // Largest value is now in its final place
                right_sorted_index_c--;

                // No swaps during this pass -> array is sorted
                if(!swapped_c) {
                    left_sorted_index_c = right_sorted_index_c;
                }
                swapped_c = false;

                state_c = "min";
                scanning_index_c = right_sorted_index_c;
            }
        }
        else if(state_c == "min") {
            // Backward pass: bubble the smallest unsorted value to the left
            if(scanning_index_c > left_sorted_index_c) {
                num_position_c = scanning_index_c - 1; // other element of the compared pair

                if(array[scanning_index_c - 1] > array[scanning_index_c]) {
                    swap(scanning_index_c - 1, scanning_index_c);
                    swapped_c = true;
                    swaps++;
                }
                scanning_index_c--;

                comparisons++;
                array_access += 2;
            }
            else {
                // Smallest value is now in its final place
                left_sorted_index_c++;

                // No swaps during this pass -> array is sorted
                if(!swapped_c) {
                    left_sorted_index_c = right_sorted_index_c;
                }
                swapped_c = false;

                state_c = "max";
                scanning_index_c = left_sorted_index_c;
            }
        }
        iterations++;
    }
    else {
        num_position_c = -1;
        scanning_index_c = -1;
    }
}

function renderCocktail() {
    for(let i = 0; i < num_numbers; i++) {
        if(left_sorted_index_c >= right_sorted_index_c) {
            context.fillStyle = "#0000ff";
        }
        else if(i == num_position_c) {
            context.fillStyle = "#ffff00";
        }
        else if(i == scanning_index_c) {
            context.fillStyle = "#ffffff";
        }
        else if(i < left_sorted_index_c || right_sorted_index_c < i) {
            context.fillStyle = "#0000ff";
        }
        else {
            context.fillStyle = "#ff0000";
        }
        context.fillRect(i * x_scale, canvas_height - array[i] * y_scale, x_scale, array[i] * y_scale);
    }
}

function initCocktail() {
    makeArray();

    left_sorted_index_c = 0;
    right_sorted_index_c = num_numbers - 1;
    scanning_index_c = 0;

    state_c = "max";
    num_interest_c = 0;
    num_position_c = -1;
}